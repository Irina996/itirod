import { logout } from "./api_service.js";

export async function loadLogoutPage(navigateTo) {
    document.getElementById("home").addEventListener("click", async () => {
        navigateTo('/home')
    })
    
    document.getElementById("logout").addEventListener("click", async () => {
        await logout();
        navigateTo('/login');
    }) 
}