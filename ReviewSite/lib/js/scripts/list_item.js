import {isLiked} from "./data_managment.js";


export async function getItem(item, navigateTo) {
    let review_title = document.getElementById('review_title');
    review_title.innerHTML = item.title;
    review_title.setAttribute('id', 'review_title_' + item.id)

    let edit_btn = document.getElementById('edit');
    edit_btn.setAttribute('id', 'edit_' + item.id);

    let remove = document.getElementById('delete');
    remove.setAttribute('id', 'delete_' + item.id)

    let review_rate = document.getElementById('review_rate');
    review_rate.innerHTML = "Rate: " + item.rate;
    review_rate.setAttribute('id', 'review_rate_' + item.id)

    let review_group = document.getElementById('review_group');
    review_group.innerHTML = "Group: " + item.review_group;
    review_group.setAttribute('id', 'review_group_' + item.id)

    let review_tags = document.getElementById('review_tags');
    review_tags.innerHTML = "Tags: " + item.tags;
    review_tags.setAttribute('id', 'review_tags_' + item.id)

    let review_description = document.getElementById('review_description');
    review_description.innerHTML = item.description;
    review_description.setAttribute('id', 'review_description_' + item.id)

    let heart = document.getElementById('like');
    let isReviewLiked = await isLiked(item.id);
    if (!isReviewLiked) {
        heart.innerHTML = "&#9825;";
        heart.value = "disliked";
    }
    else {
        heart.innerHTML = "&#10084;";
        heart.value = "liked";
    }
    heart.setAttribute('id', 'like_' + item.id)

    let comment = document.getElementById('comment');
    comment.setAttribute('id', 'comment_' + item.id)

    let image = document.getElementById('review_image');
    image.src = "images/" + item.image;
    image.setAttribute('id', 'review_image_' + item.id)
}