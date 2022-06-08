import AbstractView from "./AbstractView.js";
import { loadLoginPage } from "../scripts/login.js";

export default class extends AbstractView {
    constructor () {
        super();
        this.setTitle("Login");
    }

    async getHtml() {
        return `
        <header class="header">
            <label class="header__title">REVIEW CONTROL</label>
            <div class="elements-group">
                <button class="header__button">
                    <a href="/register" data-link>Register</a>
                </button>
            </div>
        </header>
        <form class="main-form" action="/login" method="post">
            <label class="main-form__title">Log in</label><br/>
            <label id="error_label" class="main-form__label">
            </label>
            <input id="email" type="email" required name="email" class="main-form__input" placeholder="email"><br/>
            <input id="password" type="password" required name="password" class="main-form__input" placeholder="password"><br/>
            <button id="login" type="button" class="main-form__button">Login</button><br/>
        </form>
        `;
    }

    async loadJs(navigateTo) {
        await loadLoginPage(navigateTo);
    }
}
