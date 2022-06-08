import { getList } from "../scripts/list.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor () {
        super();
    }

    async getHtml() {
        return `
        <article id="review_list" class="review-list">
        </article>
        `;
    }

    async loadJs(navigateTo, reviews) {
        await getList(reviews, navigateTo);
    }
}
