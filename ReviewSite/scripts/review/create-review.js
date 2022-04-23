import {addNewReview} from "../data/data_managment.js";

window.addEventListener('load', () => {
    createFirstTagField();
});

let createBtn = document.getElementById("create_review");
createBtn.addEventListener("click", async e => {
    let {title, rate, group, description, tags} = getStrReviewInfo();

    if (!isDataValid(title, rate, group, description, tags))
        return;
    if (!isImageInputValid())
        return;

    let imageName = saveImage();

    await addNewReview(title, rate, group, tags, description, imageName);
});


