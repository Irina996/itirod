import { loadHomePage } from "../scripts/home.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor () {
        super();
        this.setTitle("Home");
    }

    async getHtml() {
        return `
        <header class="header">
            <label class="header__title">REVIEW CONTROL</label>
            <div>
                <button class="header__button">
                    <a href="/user-account" data-link>User account</a>
                </button>
                <button class="header__button">
                    <a href="/logout" data-link>Log out</a>
                </button>
            </div>
        </header>
        <article class="main-content">
            <aside class="search-panel">
                <label class="search-panel__label">Search</label>
                <input id="search_title" type="text" class="search-panel__input" placeholder="Title"/>
                <select id="search_group" class="search-panel__select">
                    <option>All</option>
                    <option>Book</option>
                    <option>Film</option>
                    <option>Game</option>
                </select>
                <input id="search_tag" type="text" class="search-panel__input" placeholder="Tag"/>
                <input id="search_rate" type="number" min="0" max="5" class="search-panel__input" placeholder="Rate"/>
                <button id="search_button" class="search-panel__button">Go</button>
            </aside>
            <article id="review_list" class="review-list">
            </article>
        </article>
        `;
    }

    async loadJs(navigateTo) {
        await loadHomePage(navigateTo);
    }
}
