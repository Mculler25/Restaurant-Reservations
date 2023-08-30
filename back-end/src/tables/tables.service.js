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

const update = async (reservationId, tableId) => {
    await knex("reservations")
        .where({reservation_id : reservationId})
        .update({
            status : "seated"
        }, ["status"])
   return knex(tableName)
        .where({table_id : tableId})
        .update({
            reservation_id : reservationId
        }, ['reservation_id'])
}

const deleteTableAssignent = async (tableId) => {
    let reservationId = 0;
    await knex(tableName)
        .select("*")
        .where({table_id : tableId})
        .then(rows => rows[0])
        .then(data => reservationId = data.reservation_id)
    
    await knex("reservations")
        .where({reservation_id : reservationId})
        .update({
            status : "finished"
        },["status"])
    return knex(tableName)
        .where({table_id : tableId})
        .update({
            reservation_id : null
        }, ["reservation_id"])
        .returning("*")
}
 
module.exports = {
    list,
    create,
    read,
    update,
    deleteTableAssignent
}