export async function checkAuthenticated() {
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