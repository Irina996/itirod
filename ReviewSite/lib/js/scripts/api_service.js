async function register(username, email, password){
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

async function get_username() {
    let req = await fetch('/get-username', {
        method: "POST",
    });
    let res = await req.json();
    return res.name;
}

async function logout(){
    let logout = await fetch('/logout', {
        method: "POST",
        headers: {"content-type": "application/json"},
    });
}

async function login(email, password){
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

async function checkAuthenticated() {
    let auth = await fetch('/check-authenticated', {
        method: "POST",
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

export {
    register,
    get_username,
    logout,
    login,
    checkAuthenticated
}