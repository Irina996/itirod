import {getReviewList, likeReview, deleteReview, isLiked} from "./data_managment.js";

export async function loadHomePage(navigateTo){
    await listReviews(await getReviewList(), navigateTo);

    document.getElementById("search_button").addEventListener("click", async () => {
        let title = document.getElementById("search_title").value;
        let group = document.getElementById("search_group").value;
        let tag = document.getElementById("search_tag").value;
        let rate = document.getElementById("search_rate").value;

        let searched_reviews = await getReviewList(title, group, tag, rate);
        removeReviewList();
        await listReviews(searched_reviews, navigateTo);
    });
}

async function listReviews(reviews, navigateTo) {
    let review_list = document.getElementById("review_list");
    for (const i in reviews) {
        const item = reviews[i];
        let newArticle = document.createElement("article");
        newArticle.className = "review";
        review_list.appendChild(newArticle);

        let newDiv = document.createElement("div");
        newDiv.className = "elements-group";
        newArticle.appendChild(newDiv);

        let title = document.createElement("label");
        title.className = "review__title";
        title.innerHTML = item.title;
        let rate = document.createElement("label");
        rate.className = "review__label";
        rate.innerHTML = "Rate: " + item.rate;
        let group = document.createElement("label");
        group.className = "review__label";
        group.innerHTML = "Group: " + item.review_group;
        let tags = document.createElement("label");
        tags.className = "review__label";
        tags.innerHTML = "Tags: " + item.tags;
        let description = document.createElement("pre");
        description.className = "review__description";
        description.innerHTML = item.description;
        let heart = document.createElement("span");
        heart.addEventListener("click", async () => {
            if (heart.value === "liked") {
                heart.innerHTML = "&#9825;";
                heart.value = "disliked";
            } else {
                heart.innerHTML = "&#10084;";
                heart.value = "liked";
            }
            await likeReview(item.id);
        })
        let isReviewLiked = await isLiked(item.id);
        if (!isReviewLiked) {
            heart.innerHTML = "&#9825;";
            heart.value = "disliked";
        }
        else {
            heart.innerHTML = "&#10084;";
            heart.value = "liked";
        }
        heart.className = "heart";
        let comment = document.createElement("span");
        comment.innerHTML = "&#128488;";
        comment.className = "character";
        comment.addEventListener("click", () => {
            localStorage.setItem("reviewId", item.id);
            navigateTo("/comment-review");
            // window.location.href = "/comment-review.html"
        })
        let edit = document.createElement("span");
        edit.innerHTML = "&#9998;";
        edit.className = "character";
        edit.addEventListener("click", async () => {
            localStorage.setItem("reviewId", item.id);
            navigateTo("/edit-review");
            // window.location.href = "/edit-review";
        })
        let remove = document.createElement("span");
        remove.innerHTML = "&#128465;";
        remove.className = "character";
        remove.addEventListener("click", async () => {
            if (window.confirm("Are you sure you want to delete this review?")) {
                await deleteReview(item.id);
                navigateTo("/home");
                // window.location.href = "/home";
            }
        })
        //let isEditAllowed = await isCreator(item.id)
        //TODO: check is user have rights to edit/delete review
        newDiv.append(title, edit, remove, rate, group, tags, description, heart, comment);

        let image = document.createElement("img");
        image.className = "review__image";
        image.src = "images/" + item.image;
        image.alt = "Review Image";
        newArticle.appendChild(image);
    }
}

function removeReviewList()
{
    let review_list = document.getElementById("review_list");
    while (review_list.firstChild) {
        review_list.removeChild(review_list.firstChild);
    }
}