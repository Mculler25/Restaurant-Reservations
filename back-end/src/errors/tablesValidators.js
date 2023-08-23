
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

module.exports = {
    capacityValidator,
    tableNameValidator,
    tableExist
}