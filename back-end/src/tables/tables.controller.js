const P = require('pino');
const hasProperties = require('../errors/hasProperties')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const {capacityValidator , tableNameValidator , tableExist} = require('../errors/tablesValidators')
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
    ]
}
