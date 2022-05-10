export async function loadLogoutPage(navigateTo) {
    document.getElementById("home").addEventListener("click", async () => {
        navigateTo('/home')
    })
    
    document.getElementById("logout").addEventListener("click", async () => {
        await logout();
        navigateTo('/login');
    }) 
}

export async function logout(){
    let logout = await fetch('/logout', {
        method: "POST",
        headers: {"content-type": "application/json"},
    });
}