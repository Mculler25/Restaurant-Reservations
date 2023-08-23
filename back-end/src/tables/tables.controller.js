const P = require('pino');
const hasProperties = require('../errors/hasProperties')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
// const { } = require('../errors/tablesValidators')
const service = require('./tables.service');
const { as } = require('../db/connection');

const list = async(req, res, _next) => {
    res.status(200).json({ data : await service.list()})
}

module.exports = {
    list : asyncErrorBoundary(list)
}
