const knex = require('../db/connection');

const tableName = 'tables'

const list = () => {
    return knex(tableName)
        .select("*")
}

module.exports = {
    list
}