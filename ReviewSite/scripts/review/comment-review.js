import {commentReview} from "../data/data_managment.js";

let id = localStorage.getItem("reviewId");

let send_comment = document.getElementById("send-comment");
send_comment.addEventListener("click", () => {
    let comment = document.getElementById("comment").value;
    if (comment !== "") {
        document.getElementById("comment").value = "";
        //TODO: place real user id
        commentReview(id, "user_id", comment);
        //TODO: reload page
        let commentContainer = document.getElementById("commentContainer");
        let new_comment = document.createElement("p");
        new_comment.innerHTML = "user: " + comment;
        commentContainer.append(new_comment);
    }
})
