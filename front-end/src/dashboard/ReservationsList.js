import React from "react";
import Reservation from "./Reservation";
import { asDateString } from "../utils/date-time";
import { useLocation } from "react-router-dom";

const ReservationsList = ({
  reservations,
  dateToDisplayReservationsOn,
  setDateToDisplayReservationsOn,
  todaysDate,
  dateParam,
  setDateParam,
}) => {
  // find all the reservations that have status booked to show on dashboard
  const areThereTablesBooked = reservations.filter((reservation) => {
    return reservation.status === "booked";
  });
  
  // grabbing the location to make sure prev, next, buttons only show when on
  // dashboard and not on search page
  const location = useLocation();

  // when user click today button set the date to today
  // and set the date param to null so api fetch doesn't use it
  const setReservationsDisplayDateToToday = () => {
    setDateToDisplayReservationsOn(todaysDate);
    setDateParam(null);
  };

  // if there is a date param go back one day from that
  // if there is no date param stated go back from the saved date
  const setReservationsDisplayDateBackOneDay = async () => {
    if (dateParam) {
      setDateParam((prevDate) => {
         //this date is one behind one day
         let displayDate = new Date(prevDate);
         displayDate.setDate(displayDate.getDate() + 1);
         let trueDate = new Date(displayDate)
         trueDate.setDate(trueDate.getDate() - 1);
         // make sure the date is useable
         trueDate = asDateString(trueDate);
         return trueDate;
      });
    } else {
      setDateToDisplayReservationsOn((prevDate) => {
        //this date is one behind one day
        let displayDate = new Date(prevDate);
        displayDate.setDate(displayDate.getDate() + 1);
        let trueDate = new Date(displayDate)
        trueDate.setDate(trueDate.getDate() - 1);
        // make sure the date is useable
        trueDate = asDateString(trueDate);
        return trueDate;
      });
    }
  };
  // if there is a date param go foward one day from that
  // if there is no date param stated go foward from the saved date
  const setReservationsDisplayDateFowardOneDay = () => {
    if (dateParam) {
      setDateParam((nextDate) => {
         //this date is one behind one day
         let displayDate = new Date(nextDate);
         displayDate.setDate(displayDate.getDate() + 1);
         let trueDate = new Date(displayDate)
         trueDate.setDate(trueDate.getDate() + 1);
         // make sure the date is useable
         trueDate = asDateString(trueDate);
         return trueDate;
      });
    } else {
      setDateToDisplayReservationsOn((nextDate) => {
        //this date is one behind one day
        let displayDate = new Date(nextDate);
        displayDate.setDate(displayDate.getDate() + 1);
        let trueDate = new Date(displayDate)
        trueDate.setDate(trueDate.getDate() + 1);
        // make sure the date is useable
        trueDate = asDateString(trueDate);
        return trueDate;
      });
    }
  };
  return (
    <section>
      <h1 className="text-white m-2">
        Reservations {dateParam ? dateParam : dateToDisplayReservationsOn}
      </h1>
      {/* if user is on dashboard then show buttons to change date */}
      {location.pathname === "/dashboard" ? (
        <>
          <button
            onClick={setReservationsDisplayDateBackOneDay}
            className="btn btn-danger m-3"
          >
            Previous
          </button>
          <button
            onClick={setReservationsDisplayDateToToday}
            className="btn btn-danger m-3"
          >
            Today
          </button>
          <button
            onClick={setReservationsDisplayDateFowardOneDay}
            className="btn btn-danger m-3"
          >
            Next
          </button>
        </>
      ) : null}
      {/* if we found no reservations with booked status, display no reservation message */}
      {/* otherwise map over the found reservaions */}
      {areThereTablesBooked.length === 0 ? (
        <div className="border border-danger p-5 m-4">
          <h3 className="text-white">There are no booked reservations today</h3>
        </div>
      ) : (
        <div>
          {reservations.map((reservation) => (
            <Reservation
              key={reservation.reservation_id}
              reservation={reservation}
              dateToDisplayReservationsOn={dateToDisplayReservationsOn}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ReservationsList;
