import { getItem } from "../scripts/list_item.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor () {
        super();
    }

    async getHtml() {
        return `
        <article class="review">
            <div class="elements-group">
                <label id="review_title" class="review__title"></label>
                <span id="edit" class="character">✎</span>
                <span id="delete" class="character">🗑</span>
                <label id="review_rate" class="review__label">Rate: </label>
                <label id="review_group" class="review__label">Group: </label>
                <label id="review_tags" class="review__label">Tags: </label>
                <pre id="review_description" class="review__description"></pre>
                <span id="like" class="heart">❤</span>
                <span id="comment" class="character">🗨</span>
            </div>
            <img id="review_image" class="review__image" src="#" alt="Review Image">
        </article>
        `;
    }

    async loadJs(navigateTo, review) {
        await getItem(review, navigateTo)
    }
}
