const P = require('pino');
const hasProperties = require('../errors/hasProperties')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const { peopleValidator, 
  dateValidator, 
  timeValidator, 
  isDateInPast, 
  isDateATuesday, 
  isDuringBusinessHours,
  reservationExist,
  isStatusBooked,
  isStatusAlreadyFinshed,
  isStatusUnkown,
 } = require('../errors/reservationValidators')
const service = require('./reservations.service')


async function list(req, res) {
  const { date, mobile_number } = req.query;
  if(date){
    res.json({
      data : await service.listByDate(date)
    })
  } else if(mobile_number){
    res.json({ data : await service.listByMobileNumber(mobile_number)})
  }
  else {
    res.json({ 
      data: await service.list(),
    });
  }
}

const create = async(req, res, _next) => {
  res.status(201).json({data : await service.create(req.body.data)})
}

const read = async(req, res, _next) => {
  const { reservation_id } = req.params;

  res.status(200).json({data : await service.read(reservation_id)})
}

const update = async (req, res, _next) => {
  const { reservation_id } = req.params;
  const { status } = req.body.data;
  res.status(200).json({ data : await service.update(reservation_id, status)})
}

module.exports = {
  list,
  create : [hasProperties(
    'first_name',
    'last_name',
    'mobile_number',
    'reservation_date',
    'reservation_time',
    'people'
  ), peopleValidator,
  dateValidator,
  timeValidator,
  isDateInPast,
  isDateATuesday,
  isDuringBusinessHours,
  isStatusBooked,
  asyncErrorBoundary(create)],
  read : [
    reservationExist(service.read),
    asyncErrorBoundary(read)
  ],
  update : [
    reservationExist(service.read),
    isStatusUnkown,
    isStatusAlreadyFinshed,
    asyncErrorBoundary(update)
  ]
};
