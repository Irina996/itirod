import {commentReview, getComments} from "../data/data_managment.js";

let id = localStorage.getItem("reviewId");

window.addEventListener('load', async () => {
    let comments = await getComments(id);
    console.log('comments in view', comments);
    comments.forEach(function (item) {
        addComment(item.name, item.text);
    })
});

let send_comment = document.getElementById("send-comment");
send_comment.addEventListener("click", async () => {
    let comment = document.getElementById("comment").value;
    if (comment !== "") {
        document.getElementById("comment").value = "";
        await commentReview(id, comment);
        window.location.href = "/comment-review";
    }
})

function addComment(user_name, comment_text) {
    let commentContainer = document.getElementById("commentContainer");
    let new_comment = document.createElement("p");
    new_comment.innerHTML = user_name + ": " + comment_text;
    commentContainer.append(new_comment);
}
