import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor () {
        super();
        this.setTitle("Error");
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
                    <a href="/logout" data-link>Logout</a>
                </button>
            </div>
        </header>
        <form class="main-form">
            <p class="main-form__title">Error 404<br/>Not Found</p>
        </form>
        `;
    }

    async loadJs(navigateTo) {
    }
}
