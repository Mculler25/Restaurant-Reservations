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

const read = (tableId) => {
    return knex(tableName)
        .select("*")
        .where({table_id : tableId})
        .first()
}

const update = (reservationId, tableId) => {
   return knex(tableName)
        .where({table_id : tableId})
        .update({
            reservation_id : reservationId
        }, ['reservation_id'])
}
module.exports = {
    list,
    create,
    read,
    update
}