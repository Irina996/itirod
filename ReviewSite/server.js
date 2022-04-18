const express = require('express'),
    path = require('path'),
    fileupload = require('express-fileupload'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('express-flash'),
    bcrypt = require('bcrypt'),
    app = express();
const db = require('./app-modules/node-postgres/queries');
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
    successRedirect: '/',
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

app.post('/get-user-info', checkAuthenticated, (req, res) => {
    console.log('username', req.user.name);
    res.send({username: req.user.name})
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
