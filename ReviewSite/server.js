const express = require('express'),
    path = require('path'),
    fileupload = require('express-fileupload'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('express-flash'),
    bcrypt = require('bcrypt'),
    app = express();
const db = require('./app-modules/node-postgres/queries');
const review_queries = require('./app-modules/node-postgres/review_queries')
const initializePassport = require('./scripts/configs/passport-config')
initializePassport(
    passport,
    async email => {return await db.getUserByEmail(email)},
    id => db.getUserById(id)
)
require('dotenv').config();

PORT = process.env.PORT || 8000

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(express.static(__dirname));
app.use(express.json());
app.use(fileupload(undefined),);

app.get('/', checkAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/home', checkAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'registration.html'));
})

app.post('/register', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await db.createUser(req.body.username, req.body.email, hashedPassword);
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

app.post('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login')
})

app.get('/user-account', checkAuthenticated, async (req, res) => {
    const user = await req.user;
    res.render('user-account.ejs', { name: user.name })
})

app.get('/edit-review', checkAuthenticated, (req ,res) => {
    res.sendFile(path.join(__dirname, 'edit-review.html'));
})

app.get('/comment-review', checkAuthenticated, async(req, res) => {
    res.sendFile(path.join(__dirname, 'comment-review.html'));
})

app.post('/get-user-id', checkAuthenticated, (req, res) => {
    console.log('user id on server', req.user.id);
    res.send({userid: req.user.id})
})

app.post("/save-image", (req, res) => {
    // TODO: change image name to generated
    const fileName = req.files.file.name;
    const path = __dirname + '/images/' + fileName;

    req.files.file.mv(path, (error) => {
        if (error) {
            console.error(error)
            res.writeHead(500, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify({status: 'error', message: error}))
            return
        }

        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({status: 'success', path: '/img/houses/' + fileName}))
    })
})

app.get('/get-reviews', checkAuthenticated, async (req, res) => {
    let reviews = await review_queries.getReviews();
    res.send(JSON.stringify(reviews));
})

app.post('/get-review-by-id', async(req, res) => {
    const id = req.body.id;
    let review = await review_queries.getReviewById(id);
    res.send(JSON.stringify(review));
})

app.post('/create-review', async (req, res) => {
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

app.post('/is-creator', async(req, res) => {
    let reviewId = req.body.id;
    let user = await req.user;
    let userId = user.id;
    let result = await review_queries.isCreator(userId, reviewId);
    console.log('is creator ', result)
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
