import ListItem from "../views/ListItem.js";

export async function getList(reviews, navigateTo) {
    let review_list = document.getElementById("review_list");
    for (const i in reviews) {
        const item = reviews[i];
        let list_item = new ListItem();
        let new_html = await list_item.getHtml();
        review_list.innerHTML = review_list.innerHTML + new_html;
        await list_item.loadJs(navigateTo, item);
    }
}