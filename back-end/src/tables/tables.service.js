const knex = require('../db/connection');

const tableName = 'tables'

const list = () => {
    return knex(tableName)
        .select("*")
}

const create = (newTable) => {
    return knex(tableName)
        .insert(newTable)
        .returning("*")
        .then(rows => rows[0])
}

module.exports = {
    list,
    create
}