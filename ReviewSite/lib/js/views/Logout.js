import { loadLogoutPage } from "../scripts/logout.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor () {
        super();
        this.setTitle("Log out");
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
        <article class="main-form">
            <label class="main-form__title">Are you sure you want to log out?</label><br/>
            <form action="/home" method="get" class="form">
                <button id="home" type="button" class="main-form__button">No</button>
            </form>
            <form action="/logout" method="post" class="form">
                <button id="logout" type="button" class="main-form__button">Yes</button>
            </form>
        </article>
        `;
    }

    async loadJs(navigateTo) {
        await loadLogoutPage(navigateTo);
    }
}
