async function iniReviews(){
    let reviewRequest = await fetch('/get-reviews', {
        method: "GET",
        headers: {"content-type": "application/json"},
    })
    return await reviewRequest.json();
}

async function getReviewList(title = "", group = "All", tag = "", rate = ""){
    let reviews = await iniReviews();

    let review_list = [];
    reviews.forEach(function(item) {
        if (
            (title === "" || item.title.toLowerCase().indexOf(title.toLowerCase()) > -1)
            && (group === "All" || group === item.review_group)
            && (tag === "" || item.tags.includes(tag))
            && (rate === "" || rate === item.rate)
        ) {
            review_list.push(item);
        }
    });
    return review_list;
}

async function addNewReview(title, rate, group, tags, description, image) {
    let new_review = {
        id: reviews.length,
        title: title,
        rate: rate,
        review_group: group,
        tags: tags,
        description: description,
        image: image,
    }

    await fetch('/create-review', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(new_review),
    })
}

async function editReview(id, title, rate, group, tags, description, image) {
    let review = await getReview(id)
    review.title = title;
    review.rate = rate;
    review.review_group = group;
    review.tags = tags;
    review.description = description;
    if (image !== "")
        review.image = image;

    await fetch('/edit-review', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(review),
    })
}

async function getReview(id = 0){
    let getReviewRequest = await fetch('/get-review-by-id', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({"id": id}),
    })
    return await getReviewRequest.json();
}

async function deleteReview(id = 0){
    await fetch('/delete-review', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({"id": id}),
    })
}

async function likeReview(review_id) {
    await fetch('/like-review', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({"id": review_id}),
    })
}

async function isLiked(review_id) {
    let req = await fetch('/is-review-liked', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({"id": review_id}),
    })
    return await req.json();
}

async function commentReview(review_id, text) {
    let req = await fetch('/comment-review', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({"id": review_id, "text": text}),
    })
}

async function getComments(review_id) {
    let req = await fetch('/get-comments', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({"id": review_id}),
    })
    let comments = await req.json();
    console.log('comments in data management', comments);
    return comments;
}

async function isCreator(review_id) {
    let req = await fetch('/is-creator', {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({"id": review_id}),
    })
    let result = await req.json();
    console.log('isCreators in data management', result);
    return result;
}


export {
    getReviewList,
    addNewReview,
    editReview,
    getReview,
    deleteReview,
    likeReview,
    isLiked,
    commentReview,
    getComments,
};