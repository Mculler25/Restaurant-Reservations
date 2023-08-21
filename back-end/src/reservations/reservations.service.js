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
}

const listByDate = (date) => {
    return knex(tableName)
        .select('*')
        .where({reservation_date : date})
        .orderBy('reservation_time')
}

const read = (reservationId) => {
    return knex(tableName)
        .select("*")
        .where({reservation_id : reservationId})
        .first()
}

module.exports = {
    create,
    list,
    listByDate,
    read
}