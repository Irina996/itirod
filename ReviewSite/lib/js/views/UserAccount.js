import { loadUserAccountPage } from "../scripts/user-account.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor () {
        super();
        this.setTitle("User Account");
    }

    async getHtml() {
        return `
        <header class="header">
            <label class="header__title">REVIEW CONTROL</label>
            <div class="elements-group">
                <button class="header__button">
                    <a href="/home" data-link>Home</a>
                </button>
                <button class="header__button">
                    <a href="/logout" data-link>Log out</a>
                </button>
            </div>
        </header>
        <form action="create-review.html" class="main-form">
            <label id="username" class="main-form__title">Username: </label><br/>
            <button id="create-review" type="button" class="main-form__button">Create review</button>
        </form>
        `;
    }

    async loadJs(navigateTo) {
        await loadUserAccountPage(navigateTo);
    }
}
