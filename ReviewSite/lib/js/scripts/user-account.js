export async function loadUserAccountPage(navigateTo) {
    let user = document.getElementById("username")
    let req = await fetch('/get-username', {
        method: "POST",
    });
    let res = await req.json();

    user.innerHTML = "Username: " + res.name;

    document.getElementById("create-review").addEventListener("click", () => {
        navigateTo('/create-review')
    })
}