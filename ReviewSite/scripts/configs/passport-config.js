const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email)
        if (user == null) {
            console.log('No user with that email')
            return done(null, false, { message: 'No user with that email' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                console.log("SUCCESS LOGIN")
                return done(null, user)
            } else {
                console.log('Password incorrect')
                return done(null, false, { message: 'Password incorrect' })
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initialize
/*

passport.use(
    'local',
    new localStrategy(async (user, password, done) => {
        console.log('jkljkljkljkl');
        let query_result = await db.findUser(user, password)
        if (query_result.length === 0) {
            return done(null, false, {
                message: 'Wrong login or password',
            })
        }/!*
        if (user !== 'test_user')
            return done(null, false, {
                message: 'User not found',
            })
        else if (password !== 'test_password')
            return done(null, false, {
                message: 'Wrong password',
            })*!/

        return done(null, { id: 1, name: 'Test', age: 21 })
    })
)*/
