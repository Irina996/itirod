import { register } from "./api_service.js";

export async function loadRegisterPage(navigateTo) {
    document.getElementById("register").addEventListener("click", async () => {
        let username = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let isRegistered = await register(username, email, password);
        if (isRegistered) {
            navigateTo('/login');
        }
        else {
            navigateTo('/register');
        }
    })
}