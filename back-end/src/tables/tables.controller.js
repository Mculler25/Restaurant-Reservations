const P = require('pino');
const hasProperties = require('../errors/hasProperties')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const {capacityValidator , tableNameValidator , tableExist, canReservationFit, reservationExist, isTableOccupied, isReservationAlreadySeated} = require('../errors/tablesValidators')
const reservationService = require("../reservations/reservations.service")
const service = require('./tables.service');


const list = async(req, res, _next) => {
    res.status(200).json({ data : await service.list()})
}

const create = async(req, res, _next) => {
    res.status(201).json({data : await service.create(req.body.data)})
}

const read = async(req, res, _next) => {
    const { tableId } = req.params;

    res.status(200).json({
        data : await service.read(tableId)
    })
}

// const readSeating = async(req, res, _next) => {
//     const { tableId } = req.params;
    
//     res.status(200).json({
//         data : await service.getSeating(tableId)
//     })
// }

const update = async(req, res, _next) => {
    res.status(200).json({data : await service.update(req.body.data.reservation_id, req.params.tableId)})
}

const del = async (req, res, _next ) => {
    const {tableId} = req.params
    res.status(200).json({data : await service.deleteTableAssignent(tableId)})
}

module.exports = {
    list : asyncErrorBoundary(list),
    create : [
        hasProperties(
            "table_name",
            "capacity"
        ),
        capacityValidator,
        tableNameValidator,
        asyncErrorBoundary(create)
    ],
    read : [
        tableExist(service.read),
        asyncErrorBoundary(read)
    ],
    update : [
        hasProperties("reservation_id"),
        reservationExist(reservationService.read),
        canReservationFit,
        isReservationAlreadySeated,
        asyncErrorBoundary(update)
    ],
    delete : [
        tableExist(service.read),
        isTableOccupied,
        asyncErrorBoundary(del)
    ]
   
}
