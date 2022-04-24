import './example_reviews.js'

//TODO: replace by db
let r = localStorage.getItem("reviews");
let reviews = JSON.parse(r);
if (reviews === null)
{
    localStorage.setItem("reviews", JSON.stringify(window.reviews));
    reviews = window.reviews;
}

function getReviewList(title = "", group = "All", tag = "", rate = ""){
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

function addNewReview(title, rate, group, tags, description, image, user) {
    let new_review = {
        id: reviews.length,
        title: title,
        rate: rate,
        review_group: group,
        tags: tags,
        description: description,
        image: image,
        creator: user,
    }

    reviews.push(new_review);
    localStorage.setItem("reviews", JSON.stringify(reviews));
}

function editReview(id, title, rate, group, tags, description, image) {
    reviews[id].title = title;
    reviews[id].rate = rate;
    reviews[id].review_group = group;
    reviews[id].tags = tags;
    reviews[id].description = description;
    if (image !== "")
        reviews[id].image = image;

    localStorage.setItem("reviews", JSON.stringify(reviews));
}

function getReview(id = 0){
    return reviews[id];
}

function deleteReview(id = 0){
    console.log(id);
    console.log(reviews[id]);
    reviews.splice(id, 1);
    localStorage.setItem("reviews", JSON.stringify(reviews));
}

function likeReview(review_id, user) {
    // TODO: set that user liked review
}

function commentReview(review_id, user, text) {
    //TODO: set that user commented review
}

export {getReviewList, addNewReview, editReview, getReview, deleteReview, likeReview, commentReview};