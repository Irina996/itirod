const express = require("express")
const path = require("path")
const fileupload = require('express-fileupload');
const session = require('express-session');
const passport = require('passport');
const flash = require('express-flash');
const bcrypt = require('bcrypt');

const app = express()

const db = require('./lib/js/app-modules/node-postgres/queries');
const review_queries = require('./lib/js/app-modules/node-postgres/review_queries')
const initializePassport = require('./lib/js/scripts/configs/passport-config')
initializePassport(
    passport,
    async email => {return await db.getUserByEmail(email)},
    id => db.getUserById(id)
)

app.use("/lib", express.static(path.resolve(__dirname, "lib")))
app.use("/images", express.static(path.resolve(__dirname, "images")))

app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(express.json());
app.use(fileupload(undefined),);

PORT = process.env.PORT || 9900

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.post('/login', passport.authenticate('local', {failureFlash: true}), (req, res) => {
    res.send(JSON.stringify('hello'))
})

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.createUser(req.body.username, req.body.email, hashedPassword);
        res.sendStatus(200)
    }
    catch {
        res.sendStatus(401)
    }
})

app.post('/logout', (req, res) => {
    req.logOut();
    res.sendStatus(200);
})

app.post('/check-authenticated', (req, res) => {
    if (req.isAuthenticated()) {
        res.sendStatus(200)
    }
    else {
        res.sendStatus(401)
    }
})

app.post('/get-username', async (req, res) => {
    const user = await req.user;
    res.send(JSON.stringify({name: user.name}))
})

app.post('/get-reviews', checkAuthenticated, async (req, res) => {
    let reviews = await review_queries.getReviews();
    res.send(JSON.stringify(reviews));
})

app.post('/get-review-by-id', checkAuthenticated, async(req, res) => {
    const id = req.body.id;
    let review = await review_queries.getReviewById(id);
    res.send(JSON.stringify(review));
})

app.post('/create-review', checkAuthenticated, async (req, res) => {
    let user = await req.user;
    let userId = user.id;
    const new_review = req.body;
    new_review.creator = userId;
    let r = await review_queries.createReview(new_review);
    if (r === true)
        res.sendStatus(200);
    else
        res.sendStatus(500);
})

app.post('/edit-review', async (req, res) => {
    const review = req.body;
    let r = await review_queries.editReview(review);
    if (r === true)
        res.sendStatus(200);
    else
        res.sendStatus(500);
})

app.post("/delete-review", async (req, res) => {
    const id = req.body.id;
    let result = await review_queries.deleteReview(id);
    if (!result)
        res.sendStatus(500);
    res.sendStatus(200);
})

app.post('/like-review', async (req, res) => {
    let reviewId = req.body.id;
    let user = await req.user;
    let userId = user.id;
    let result = await review_queries.likeReview(reviewId, userId);
})

app.post('/is-review-liked', async (req, res) => {
    let reviewId = req.body.id;
    let user = await req.user;
    let userId = user.id;
    let result = await review_queries.isReviewLiked(reviewId, userId);
    res.send(result);
})

app.post('/comment-review', async(req, res) => {
    let reviewId = req.body.id;
    let text = req.body.text;
    console.log('text', text);
    let user = await req.user;
    let userId = user.id;
    let result = await review_queries.commentReview(reviewId, userId, text);
    console.log('inserted comment', result)
    res.send(result);
})

app.post('/get-comments', async(req, res) => {
    let reviewId = req.body.id;
    let result = await review_queries.getComments(reviewId);
    console.log('comments', result)
    res.send(result);
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.listen(PORT)