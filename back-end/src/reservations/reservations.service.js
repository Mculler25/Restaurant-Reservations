const knex = require('../db/connection');

const tableName = 'reservations'

const create = (newReservation) => {
    return knex(tableName)
        .insert(newReservation)
        .returning("*")
        .then(rows => rows[0])
}

const list = () => {
    return knex(tableName)
        .select('*')
        .then(rows => rows.filter((row) => {
            return row.status !== "finished";
        }))
}

const listByDate = (date) => {
    return knex(tableName)
        .select('*')
        .where({reservation_date : date})
        .orderBy('reservation_time')
        .then(rows => rows.filter((row) => {
            return row.status !== "finished";
        }))
}

const read = (reservationId) => {
    return knex(tableName)
        .select("*")
        .where({reservation_id : reservationId})
        .first()
}

const update = (reservationId, statusGiven) => {
    
    return knex(tableName)
        .where({ reservation_id : reservationId})
        .update({
            status : statusGiven
        },["status"])
        .returning("*")
        .then(rows => rows[0])
        
}

module.exports = {
    create,
    list,
    listByDate,
    read,
    update
}