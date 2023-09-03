const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const {
  peopleValidator,
  dateValidator,
  timeValidator,
  isDateInPast,
  isDateATuesday,
  isDuringBusinessHours,
  reservationExist,
  isStatusBooked,
  isStatusAlreadyFinshed,
  isStatusUnkown,
} = require("../errors/reservationValidators");
const service = require("./reservations.service");

async function list(req, res) {
  const { date, mobile_number } = req.query;
  let serviceData = null;
  if (date) {
    serviceData = await service.listByDate(date)
  } else if (mobile_number) {
    serviceData = await service.listByMobileNumber(mobile_number)
  } else {
    serviceData = await service.list()
  }

  res.json({data : serviceData})
}

const create = async (req, res, _next) => {
  res.status(201).json({ data: await service.create(req.body.data) });
};

const read = async (req, res, _next) => {
  const { reservation_id } = req.params;

  res.status(200).json({ data: await service.read(reservation_id) });
};

const updateStatus = async (req, res, _next) => {
  const { reservation_id } = req.params;
  const { status } = req.body.data;
  res
    .status(200)
    .json({ data: await service.updateStatus(reservation_id, status) });
};

const updateReservation = async (req, res, next) => {
  res.json({ data: await service.updateReservation(req.body.data) });
};

module.exports = {
  list,
  create: [
    hasProperties(
      "first_name",
      "last_name",
      "mobile_number",
      "reservation_date",
      "reservation_time",
      "people"
    ),
    peopleValidator,
    dateValidator,
    timeValidator,
    isDateInPast,
    isDateATuesday,
    isDuringBusinessHours,
    isStatusBooked,
    asyncErrorBoundary(create),
  ],
  read: [reservationExist(service.read), asyncErrorBoundary(read)],
  updateStatus: [
    reservationExist(service.read),
    isStatusUnkown,
    isStatusAlreadyFinshed,
    asyncErrorBoundary(updateStatus),
  ],
  updateReservation: [
    reservationExist(service.read),
    hasProperties(
      "first_name",
      "last_name",
      "mobile_number",
      "reservation_date",
      "reservation_time",
      "people"
    ),
    peopleValidator,
    dateValidator,
    timeValidator,
    isDateInPast,
    isDateATuesday,
    isDuringBusinessHours,
    asyncErrorBoundary(updateReservation),
  ],
};
