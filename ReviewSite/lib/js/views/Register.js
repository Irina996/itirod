import { loadRegisterPage } from "../scripts/register.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor () {
        super();
        this.setTitle("Register");
    }

    async getHtml() {
        return `
        <header class="header">
            <label class="header__title">REVIEW CONTROL</label>
            <div class="elements-group">
                <button class="header__button">
                    <a href="/login" data-link>Login</a>
                </button>
            </div>
        </header>
        <form class="main-form" action="/register" method="post">
            <label class="main-form__title">Registration</label><br/>
            <input id="username" name="username" class="main-form__input" placeholder="username"><br/>
            <input id="email" name="email" class="main-form__input" placeholder="email"><br/>
            <input id="password" name="password" class="main-form__input" placeholder="password"><br/>
            <button id="register" type="button" class="main-form__button">Register</button><br/>
        </form>
        `;
    }

    async loadJs(navigateTo) {
        await loadRegisterPage(navigateTo);
    }
}
