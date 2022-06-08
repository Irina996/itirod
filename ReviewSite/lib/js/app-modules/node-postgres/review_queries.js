const { pool } = require("./config");

const getReviews = async () => {
    let reviews = {};
    await pool
        .query("SELECT R.Id, R.Title, R.RATE, RG.Name AS review_group, R.Description, R.Image_Path as image, R.Creator_Id " +
            "FROM REVIEW R LEFT JOIN REVIEW_GROUP RG on R.Group_Id = RG.Id ORDER BY Id DESC;")
        .then(res => {reviews = res.rows});

    for (const i in reviews) {
        let tags = [];
        await pool
            .query("SELECT ARRAY (SELECT TAG.Name FROM REVIEW_TAG RT LEFT JOIN TAG ON RT.Tag_Id = TAG.Id WHERE RT.Review_ID = $1) AS TAGS;",
                [reviews[i].id])
            .then(res => {tags = res.rows[0].tags})

        reviews[i].tags = tags;
    }
    return reviews;
}

const getReviewById = async(review_id) => {
    let review = []
    await pool
        .query("SELECT R.Id, R.Title, R.RATE, RG.Name AS review_group, R.Description, R.Image_Path as image, R.Creator_Id " +
            "FROM REVIEW R LEFT JOIN REVIEW_GROUP RG on R.Group_Id = RG.Id WHERE R.ID = $1;",
            [review_id])
        .then(res => {review = res.rows[0]});
    let tags = [];
    await pool
        .query("SELECT ARRAY (SELECT TAG.Name FROM REVIEW_TAG RT LEFT JOIN TAG ON RT.Tag_Id = TAG.Id WHERE RT.Review_ID = $1) AS TAGS;",
            [review_id])
        .then(res => {tags = res.rows[0].tags});
    review.tags = tags;
    return review;
}

const createReview = async (review) => {
    console.log('--------------------------- data create review 1-----------------------');
    let group_id;
    await pool
        .query('SELECT G.ID FROM review_group G WHERE G.name = $1', [review.review_group])
        .then(res => {group_id = res.rows[0].id})

    let result;
    await pool
        .query("INSERT INTO REVIEW (title, rate, group_id, description, image_path, creator_id) " +
            "VALUES ($1, $2, $3, $4, $5, $6) returning id",
            [review.title, review.rate, group_id, review.description, review.image, review.creator])
        .then(res => {result = res});

    console.log('--------------------------- data create review 2-----------------------', result, 
    '------------------------------------------------------------------');
    
    if (result.rowCount === 0) {
        return false;
    }

    let review_id = result.rows[0].id;
    await addTags(review.tags, review_id);

    console.log('--------------------------- data create review 3-----------------------');
    
    return true;
}

const editReview = async (review)=> {
    let group_id;
    await pool
        .query('SELECT G.ID FROM review_group G WHERE G.name = $1', [review.review_group])
        .then(res => {group_id = res.rows[0].id})

    let result;
    await pool
        .query("UPDATE REVIEW SET Title = $1, Rate = $2, group_id = $3, description = $4, image_path = $5 WHERE id = $6",
            [review.title, review.rate, group_id, review.description, review.image, review.id])
        .then(res => {result = res});

    await deleteReviewTags(review.id);
    await addTags(review.tags, review.id);

    return true;
}

const deleteReview = async(review_id) => {
    await deleteReviewTags(review_id);
    let result;
    await pool
        .query("DELETE FROM REVIEW WHERE id = $1",
            [review_id])
        .then(res => {result = res});

    return result.rowCount !== 0;
}

const likeReview = async(review_id, user_id) => {
    let result;
    if (!(await isReviewLiked(review_id, user_id))) {
        await pool
            .query('INSERT INTO like_review (review_id, user_id) VALUES ($1, $2)', [review_id, user_id])
            .then(res => {
                result = res.rowCount;
            })
        return result !== 0;
    }
    else {
        await pool
            .query('DELETE FROM like_review WHERE review_id = $1 AND user_id = $2', [review_id, user_id])
            .then(res => {
                result = res.rowCount;
            })
        return result !== 0;
    }
}

const isReviewLiked = async (review_id, user_id)=> {
    let result;
    await pool
        .query('SELECT * FROM like_review WHERE review_id = $1 and user_id = $2',
            [review_id, user_id])
        .then(res => {result = res.rowCount})

    return result !== 0;
}

const commentReview = async (review_id, user_id, comment_text) => {
    await pool
        .query('INSERT INTO comment_review (review_id, user_id, text) VALUES ($1, $2, $3)',
            [review_id, user_id, comment_text])
        .then(res => {})
}

const getComments = async(review_id) => {
    let result;
    await pool
        .query('SELECT u.Name, c.text FROM comment_review c LEFT JOIN app_user u on u.id = c.user_id WHERE review_id = $1 ORDER BY c.Id',
            [review_id])
        .then(res => {result = res.rows})
    return result;
}

const isCreator = async(user_id, review_id) => {
    let result;
    await pool
        .query('SELECT review.creator_id FROM review where review.id = $1',
            [review_id])
        .then(res => result = res.rows[0])
    return user_id === result.creator_id;
}

const listReviews = async(title = "", group = "All", tag = "", rate = "") => {
//    SELECT FROM REVIEWS ..
//    WHERE COLUMNS LIKE
//    what would happen if after like be ""?

}

const addTags = async(tags, review_id) => {
    console.log('--------------------------- data add tags 1-----------------------');
    for (const i in tags) {
        let tag_id;
        await pool
            .query("INSERT INTO TAG (name) VALUES ($1) ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id", [tags[i]])
            .then(res => {tag_id = res.rows[0].id})

        await pool
            .query("INSERT INTO review_tag (review_id, tag_id) VALUES ($1, $2)", [review_id, tag_id])
            .then(res => {})
    }
}

const deleteReviewTags = async (review_id)=> {
    let result;
    await pool
        .query("DELETE FROM review_tag WHERE review_id = $1",
            [review_id])
        .then(res => {result = res.rowCount})
    return result !== 0;
}

module.exports = {
    getReviews,
    getReviewById,
    createReview,
    editReview,
    deleteReview,
    likeReview,
    isReviewLiked,
    commentReview,
    getComments,
    isCreator,
}