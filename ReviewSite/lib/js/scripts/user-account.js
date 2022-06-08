import { get_username } from "./api_service.js";

export async function loadUserAccountPage(navigateTo) {
    let user = document.getElementById("username")
    let username = await get_username();

    user.innerHTML = "Username: " + username;

    document.getElementById("create-review").addEventListener("click", () => {
        navigateTo('/create-review')
    })
}