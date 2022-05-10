import {editReview, getReview} from "../data_managment.js";
import {getStrReviewInfo, saveImage, isDataValid, 
    isImageInputValid} from "./process_review.js";

export async function LoadEditPage(navigateTo) {
    let id = localStorage.getItem("reviewId");
    let review = await getReview(id);
    document.getElementById("title").value = review.title;
    document.getElementById("rate").value = review.rate;
    document.getElementById("group").value = review.review_group;
    document.getElementById("description").innerHTML = review.description;
    for (let i = 0; review.tags[i] !== undefined; i++)
    {
        addTagField();
        document.getElementById("Tag[" + (i + 1) + "]").value = review.tags[i];
    }
    addTagField();
    document.getElementById("image_preview").src = "images/"+review.image;

    let editBtn = document.getElementById("edit_review");
    editBtn.addEventListener("click", async () => {
        let {title, rate, group, description, tags} = getStrReviewInfo();

        if (!isDataValid(title, rate, group, description, tags))
            return;

        let imageName;
        if (!isImageInputValid())
            imageName = "";
        else
            imageName = saveImage();

        await editReview(id, title, rate, group, tags, description, imageName);
        navigateTo("/user-account")
        // window.location.href = "/user-account";
    });
}