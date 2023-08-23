
const capacityValidator = (req, res, next) => {
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

const tableNameValidator = (req, res, next) => {
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

module.exports = {
    capacityValidator,
    tableNameValidator
}