const db = require('../../data/dbConfig');

function find() {
    return db("users");
}

function findBy(filter){
    return db("users")
    .where(filter)
    .first()
}

function getUsername(username) {
    return db("users")
    .where({username})
    .first()
}

function findById(id){
    return db("users")
    .where({id})
    .first()
}

async function add(user) {
    const [userId] = await db('users').insert(user)
    return db('users as u')
    .where('id', userId)
    .select('u.username', 'u.id')
}

module.exports = {
    find,
    findBy,
    add,
    getUsername
}