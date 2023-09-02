const moment = require("moment");
const knex = require("../db/connection");

// make sure that people is an integer
const peopleValidator = (req, _res, next) => {
  let { people } = req.body.data;

  if (!Number.isInteger(people)) {
    next({
      status: 400,
      message: "people is not a number",
    });
  } else {
    next();
  }
};

// make sure date is valid format
const isValidDate = (date) => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  return datePattern.test(date);
};

const dateValidator = (req, res, next) => {
  const { reservation_date } = req.body.data;
  if (isValidDate(reservation_date)) {
    next();
  } else {
    next({
      status: 400,
      message: "reservation_date need to be a date",
    });
  }
};

// make sure time is valid format
const isValidTime = (time) => {
  const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  return timePattern.test(time);
};

const timeValidator = (req, _res, next) => {
  const { reservation_time } = req.body.data;
  if (isValidTime(reservation_time)) {
    next();
  } else {
    next({
      status: 400,
      message: "reservation_time should be a time formatted like hh-mm",
    });
  }
};

// make sure reservation is not in past
const isDateInPast = (req, _res, next) => {
  const { reservation_date , reservation_time } = req.body.data;
  const submitedDate = moment(`${reservation_date} ${reservation_time}`, "YYYY-MM-DD HH:mm");
  const currentDate = moment();

  if (submitedDate.isBefore(currentDate)) {
    next({
      status: 400,
      message: "reservation date needs to be in the future",
    });
  } else {
    next();
  }
};

// make sure reservation is not on tuesday when closed
const isDateATuesday = (req, res, next) => {
  const { reservation_date } = req.body.data;
  const submitedDate = moment(reservation_date);

  if (submitedDate.day() === 2) {
    next({
      status: 400,
      message: "We are closed on Tuesday",
    });
  } else {
    next();
  }
};

// make sure reservation is made while open
const isDuringBusinessHours = (req, res, next) => {
  const { reservation_time } = req.body.data;

  const submittedTime = moment(reservation_time, "HH:mm");
  const minTime = moment("10:30 AM", "h:mm A");
  const maxTime = moment("9:30 PM", "h:mm A");

  if (submittedTime.isBetween(minTime, maxTime, [])) {
    next();
  } else {
    next({
      status: 400,
      message: "reservation must be between 10:30 am and 9:30 pm",
    });
  }
};

const reservationExist = (readreservations) => {
  return async (req, res, next) => {
    const { reservation_id } = req.params;
    const reservation = await readreservations(reservation_id);

    if (reservation) {
      res.locals.reservation = reservation;
      return next();
    } else {
      return next({
        status: 404,
        message: `reservation ${reservation_id} does not exist`,
      });
    }
  };
};

const isStatusBooked = (req, res, next) => {
  const { status } = req.body.data;

  if (!status) {
    next();
  } else if (status === "booked") {
    next();
  } else {
    next({
      status: 400,
      message: `The status should be booked and not ${status}`,
    });
  }
};

const isStatusAlreadyFinshed = async (req, res, next) => {
  const response = await knex("reservations")
    .select("*")
    .where({ reservation_id: req.params.reservation_id })
    .first();

  if (response.status === "finished") {
    next({
      status: 400,
      message: "The reservation status is already finished",
    });
  } else {
    next();
  }
};

const isStatusUnkown = (req, res, next) => {
  const { status } = req.body.data;

  if (status === "booked") {
    next();
  } else if (status === "seated") {
    next();
  } else if (status === "finished") {
    next();
  } else if (status === "cancelled") {
    next();
  } else {
    next({
      status: 400,
      message: "The status is unknown",
    });
  }
};

module.exports = {
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
};
