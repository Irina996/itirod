import { login } from "./api_service.js";

export async function loadLoginPage(navigateTo) {
    document.getElementById("login").addEventListener("click", async () => {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let isAuthed = await login();
        if (isAuthed) {
            navigateTo('/home');
        }
        else {
            let error_message = document.getElementById("error_label");
            error_message.innerHTML = "Wrong email or password<br/>";
        }
    })
}