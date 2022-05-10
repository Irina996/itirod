export async function loadLoginPage(navigateTo) {
    document.getElementById("login").addEventListener("click", async () => {
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

async function login(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let user = {
        email: email,
        password: password
    }

    let auth = await fetch('/login', {
        method: "POST",
        body: new URLSearchParams(user),
    });

    if (auth.status === 401) {
        return false;
    }
    else if (auth.status === 200) {
        return true;
    }
    else {
        // some error
        console.log(auth.statusText)
        return false;
    }
}