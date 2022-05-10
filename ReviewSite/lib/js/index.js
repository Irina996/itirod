import Home from "./views/Home.js";
import Login from "./views/Login.js";
import Logout from "./views/Logout.js"
import Register from "./views/Register.js";
import ErrorView from "./views/ErrorView.js";
import EditReview from "./views/EditReview.js";
import UserAccount from "./views/UserAccount.js";
import CreateReview from "./views/CreateReview.js";
import CommentReview from "./views/CommentReview.js";
import { checkAuthenticated } from "./scripts/check_authenticated.js";



const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        { path: "/error", view: ErrorView},
        { path: "/", view: Home },
        { path: "/home", view: Home },
        { path: "/login", view: Login },
        { path: "/logout", view: Logout },
        { path: "/register", view: Register},
        { path: "/user-account", view: UserAccount },
        { path: "/edit-review", view: EditReview },
        { path: "/create-review", view: CreateReview },
        { path: "/comment-review", view: CommentReview },
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        }
    };

    let isAuthenticated = await checkAuthenticated();

    if  (    
            (isAuthenticated 
                && match.route.path !== '/login' 
                && match.route.path !== '/register') 
            || (!isAuthenticated 
                && (match.route.path === '/login' 
                || match.route.path === '/register')
            || match.route.path === '/error')
        ) {

        const view = new match.route.view();

        document.querySelector("#app").innerHTML = await view.getHtml();

        await view.loadJs(navigateTo);
    }
    else if (
        match.route.path === '/login' 
        || match.route.path === '/register'
        )  {
        navigateTo('/home')
    }
    else {
        navigateTo('/login')
    }
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", async () => {
    document.body.addEventListener("click", async (e)  => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
})
