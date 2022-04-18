const { pool } = require("./config");

const getUsers = async() => {
    try {
        let result = {};
        await pool
            .query("SELECT * FROM app_user")
            .then(res => {result = res.rows});

        return result;
    }
    catch(e){
        console.error(e)
        throw e;
    }
}

const getUserById = async(id) => {
    try {
        let result = {};
        await pool
            .query("SELECT * FROM app_user WHERE id = $1", [id])
            .then(res => {result = res.rows});

        return result;
    }
    catch(e){
        console.error(e)
        throw e;
    }
}

const getUserByEmail = async(email) => {
    try {
        let result = {};
        await pool
            .query("SELECT * FROM app_user WHERE email = $1", [email])
            .then(res => {result = res.rows});

        return result;
    }
    catch(e){
        console.error(e)
        throw e;
    }
}

const getUserByName = async(name) => {
    try {
        let result = {};
        await pool
            .query("SELECT * FROM app_user WHERE name = $1", [name])
            .then(res => {result = res.rows});

        return result;
    }
    catch(e){
        console.error(e)
        throw e;
    }
}

const findUser = async(email, password) => {
    try {
        let result = {};
        await pool
            .query("SELECT * FROM app_user WHERE email = $1 AND password = $2", [email, password])
            .then(res => {result = res.rows});

        return result;
    }
    catch(e){
        console.error(e)
        throw e;
    }
}


const createUser = async(name, email, password) => {
    try {
        let result = {};
        await pool
            .query("INSERT INTO app_user (name, email, password) VALUES ($1, $2, $3)", [name, email, password])
            .then(res => {result = res});

        return result;
    }
    catch(e){
        console.error(e)
        throw e;
    }
}

const updateUser = async (id, name, email, password) => {
    try {
        let result = {};
        await pool
            .query("UPDATE app_user SET name = $1, email = $2, password = $3 WHERE id = $4", [name, email, password, id])
            .then(res => {result = res});

        return result;
    }
    catch(e){
        console.error(e)
        throw e;
    }
}

const deleteUser = async(id) => {
    try {
        let result = {};
        await pool
            .query("DELETE FROM app_user WHERE id = $1", [id])
            .then(res => {result = res});

        return result;
    }
    catch(e){
        console.error(e)
        throw e;
    }
}

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    getUserByName,
    findUser,
    createUser,
    updateUser,
    deleteUser,
}
