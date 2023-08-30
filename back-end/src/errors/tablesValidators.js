const knex = require('../db/connection');

const capacityValidator = (req, _res, next) => {
    let { capacity } = req.body.data;

    if(!Number.isInteger(capacity)){
        next({
            status : 400,
            message : "capacity is not a number"
        })
    } else {
        next();
    }
}

const tableNameValidator = (req, _res, next) => {
    const { table_name } = req.body.data;

    if(table_name.length <= 1){
        next({
            status : 400,
            message : "table_name needs to be more than one character"
        })
    } else {
        next();
    }
}

const tableExist = (readTables) => {
    return async(req , res, next) => {
        const { tableId } = req.params;
        const table = await readTables(tableId)

        if(table){
            res.locals.table = table;
            return next();
        } else {
            return next({
                status : 404,
                message : `table ${tableId} does not exist`
            })
        }
    }
}

const reservationExist = (readreservations) => {
    return async(req , res, next) => {
        const { reservation_id } = req.body.data;
        const reservation = await readreservations(reservation_id)

        if(reservation){
            res.locals.reservation = reservation;
            return next();
        } else {
            return next({
                status : 404,
                message : `reservation ${reservation_id} does not exist`
            })
        }
    }
}

const canReservationFit = async(req, res, next) => {
    const { tableId } = req.params;
   
    
    const reservation = await knex("reservations")
        .select("*")
        .where({reservation_id : req.body.data.reservation_id})
        .first()


    const table = await knex("tables")
        .select("*")
        .where({table_id : tableId})
        .first()

    if(!reservation){
        next({
            status: 404,
            message: `Reservation ${reservation.reservation_id} not found`
        })
    } 

    if(table.reservation_id) {
        next({
            status : 400,
            message : "table is occupied"
        })
    }
    
    if(reservation.people <= table.capacity){
       next()
    } else {
        next({
            status : 400,
            message : "table does not have enough capacity"
        })
    }
}

const isTableOccupied = async (req, res, next) => {
    const { tableId } = req.params; 

    const table = await knex("tables")
            .select("*")
            .where({table_id : tableId})
            .first()
    
    if(table.reservation_id){
        next();
    } else {
        next({
            status : 400,
            message : "table is not occupied"
        })
    }
}

module.exports = {
    capacityValidator,
    tableNameValidator,
    tableExist,
    canReservationFit,
    reservationExist,
    isTableOccupied
}