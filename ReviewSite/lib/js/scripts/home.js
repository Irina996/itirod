import List from "../views/List.js";
import {getReviewList, likeReview, deleteReview, isLiked, editReview} from "./data_managment.js";

export async function loadHomePage(navigateTo){
    await listReviews(await getReviewList(), navigateTo);
}

async function listReviews(reviews, navigateTo) {
    let main_content = document.getElementById('main_content');
    let list = new List();
    let list_html = await list.getHtml();
    main_content.innerHTML = main_content.innerHTML + list_html;
    await list.loadJs(navigateTo, reviews);
    
    document.getElementById("search_button").addEventListener("click", async () => {
        let title = document.getElementById("search_title").value;
        let group = document.getElementById("search_group").value;
        let tag = document.getElementById("search_tag").value;
        let rate = document.getElementById("search_rate").value;

        let searched_reviews = await getReviewList(title, group, tag, rate);
        removeReviewList();
        await listReviews(searched_reviews, navigateTo);
    });

    for (const i in reviews) {
        const item = reviews[i];
        addBtnEventListeners(item.id, navigateTo);
    }
}

function removeReviewList()
{
    let review_list = document.getElementById("review_list");
    review_list.remove();
}

function addBtnEventListeners(item_id, navigateTo){
    let edit_btn = document.getElementById('edit_' + item_id);
        edit_btn.addEventListener("click", async () => {
            localStorage.setItem("reviewId", item_id);
            navigateTo("/edit-review");
        });
        let remove_btn = document.getElementById('delete_' + item_id)
        remove_btn.addEventListener("click", async () => {
            if (window.confirm("Are you sure you want to delete this review?")) {
                await deleteReview(item_id);
                navigateTo("/home");
            }
        });
        let heart = document.getElementById('like_' + item_id);
        heart.addEventListener("click", async () => {
            let isReviewLiked = await isLiked(item_id);
            if (isReviewLiked) {
                heart.innerHTML = "&#9825;";
                heart.value = "disliked";
            }
            else {
                heart.innerHTML = "&#10084;";
                heart.value = "liked";
            }
            await likeReview(item_id);
        });
        let comment = document.getElementById('comment_' + item_id);
        comment.addEventListener("click", () => {
            localStorage.setItem("reviewId", item_id);
            navigateTo("/comment-review");
        })
}