import { loadDropZone } from "../scripts/img_input/img_input.js";
import { loadCreateReviewPage } from "../scripts/review/create-review.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor () {
        super();
        this.setTitle("Create review");
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
        <form action="/user-account" method="get" class="main-form">
            <label class="main-form__title">Create review</label><br/>
            <input id="title" type="text" required class="main-form__input" placeholder="Title"><br/>
            <input id="rate" type="number" required min="0" max="5" class="main-form__input" placeholder="Rate"><br/>
            <select id="group" class="main-form__select">
                <option>Book</option>
                <option>Film</option>
                <option>Game</option>
            </select><br/>
            <div id="tagsContainer">
                <!--<input id="Tag[1]" type="text" required
                    onchange="addTagField()" class="main-form__input" placeholder="Tag">-->
            </div>
            <textarea id="description" required class="main-form__textarea" placeholder="Description"></textarea><br/>
            <div id="drop-zone" class="drop-zone">
                Drop image here...
                <div id="drop-zone_button" class="drop-zone__button">
                    or click here...
                    <input id="image" class="drop-zone__input" type="file" accept=".jpg, .png" required/>
                </div>
            </div>
            <br/>
            <img id="image_preview" class="main-form__image" src="images/image.png"><br/>
            <button id="create_review" type="button" class="main-form__button">Create</button><br/>
        </form>
        `;
    }

    async loadJs(navigateTo) {
        await loadCreateReviewPage(navigateTo);
        await loadDropZone();
    }
}
