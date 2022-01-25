const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

function checkForData(req, res, next) {
  const data = req.body.data;
  if (!data) {
    return next({
      status: 400,
      message: "Data is missing.",
    });
  }
  return next();
}

function validateDate(req, res, next) {
  const dateFormat = /\d\d\d\d-\d\d-\d\d/;
  const {
    data: { reservation_date },
  } = req.body;
  if (!reservation_date.match(dateFormat)) {
    return next({
      status: 400,
      message: "The reservation_date must be in format 'yyyy-mm-dd'.",
    });
  }
  return next();
}

function validateTime(req, res, next) {
  const timeFormat = /\d\d:\d\d/;
  const {
    data: { reservation_time },
  } = req.body;
  if (!reservation_time.match(timeFormat)) {
    return next({
      status: 400,
      message: "The reservation_time must be in format 'hh:mm:ss'.",
    });
  }
  return next();
}

function validatePeople(req,res,next) {
  const {
    data: { people },
  } = req.body;
  if (!Number.isInteger(people)) {
    return next({
      status: 400,
      message: "The number people must be a number.",
    });
  }
  return next();
}
// routes


/**
 * List handler for reservation resources
 */


async function list(req, res) {
  res.json({
    data: await service.list(req.query.date),
  });
}



async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    checkForData,
    hasRequiredProperties,
    validateDate,
    validateTime,
    validatePeople,
    asyncErrorBoundary(create),
  ],
};
