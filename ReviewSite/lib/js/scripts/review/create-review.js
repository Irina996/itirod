import { addNewReview } from "../data_managment.js";
import { getStrReviewInfo, isDataValid, isImageInputValid, 
    saveImage } from "./process_review.js";

export async function loadCreateReviewPage(navigateTo) {
    createFirstTagField();

    let createBtn = document.getElementById("create_review");
    createBtn.addEventListener("click", async e => {
        let {title, rate, group, description, tags} = getStrReviewInfo();

        if (!isDataValid(title, rate, group, description, tags))
            return;
        if (!isImageInputValid())
            return;

        let imageName = saveImage();

        await addNewReview(title, rate, group, tags, description, imageName);

        navigateTo('/user-account')
    });
}