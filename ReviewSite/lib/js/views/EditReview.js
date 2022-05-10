import { LoadEditPage } from "../scripts/review/edit-review.js";
import { loadDropZone } from "../scripts/img_input/img_input.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor () {
        super();
        this.setTitle("Edit review");
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
        <form class="main-form">
            <label class="main-form__title">Edit review</label><br/>
            <label class="main-form__label">Title:</label>
            <input id="title" type="text" required class="main-form__input"><br/>
            <label class="main-form__label">Rate:</label>
            <input id="rate" type="number" required min="0" max="5" class="main-form__input"><br/>
            <label class="main-form__label">Group:</label>
            <select id="group" class="main-form__select">
                <option value="Book">Book</option>
                <option value="Film">Film</option>
                <option value="Game">Game</option>
            </select><br/>
            <div id="tagsContainer">
                <label class="main-form__label">Tags:</label>

            </div><br>
            <label class="main-form__label">Description:</label><br>
            <textarea id="description" required class="main-form__textarea" placeholder="Description"></textarea><br/>
            <div id="drop-zone" class="drop-zone">
                Drop image here...
                <div id="drop-zone_button" class="drop-zone__button">
                    or click here...
                    <input id="image" class="drop-zone__input" type="file" accept=".jpg, .png"/>
                </div>
            </div>
            <br/>
            <img id="image_preview" class="main-form__image" src="images/image.png"><br/>
            <button id="edit_review" type="button" class="main-form__button">Edit</button><br/>
        </form>
        `;
    }

    async loadJs(navigateTo) {
        await LoadEditPage(navigateTo);
        await loadDropZone();
    }
}
