import { loadCommentReviewPage } from "../scripts/review/comment-review.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor () {
        super();
        this.setTitle("Comment review");
    }

    async getHtml() {
        return `
        <header class="header">
            <label class="header__title">REVIEW CONTROL</label>
            <div class="elements-group">
                <button class="header__button">
                    <a href="/user-account" data-link>Your account</a>
                </button>
                <button class="header__button">
                    <a href="/logout" data-link>Log out</a>
                </button>
            </div>
        </header>
        <article class="comment">
            <div id="commentContainer" class="comment__container">

            </div>
            <div class="footer">
                <input id="comment" class="comment__input" type="text">
                <span id="send-comment" class="comment__button">&#x27a4;</span>
            </div>
        </article>
        `;
    }

    async loadJs(navigateTo) {
        loadCommentReviewPage();
    }
}
