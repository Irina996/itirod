export async function loadRegisterPage(navigateTo) {
    document.getElementById("register").addEventListener("click", async () => {
        let isRegistered = await register();
        if (isRegistered) {
            navigateTo('/login');
        }
        else {
            navigateTo('/register');
        }
    })
}

async function register(){
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let user = {
        username: username,
        email: email,
        password: password
    }

    let register = await fetch('/register', {
        method: "POST",
        body: new URLSearchParams(user),
    });

    if (register.status === 401) {
        return false;
    }
    else if (register.status === 200) {
        return true;
    }
    else {
        // some error
        console.log(register.statusText)
        return false;
    }
}