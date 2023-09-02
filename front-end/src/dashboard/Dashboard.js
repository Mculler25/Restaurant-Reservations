import React, { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "./ReservationsList";
import moment from "moment/moment";
import TablesList from "./TablesList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({
  reservations,
  error,
  tables,
  tablesError,
  dateToDisplayReservationsOn,
  setDateToDisplayReservationsOn,
  todaysDate,
  dateParam,
  setDateParam,
}) {
  const [currentTime, setCurrentTime] = useState(moment());

  // get the time every minute to display
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(moment());
    }, 60000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <main>
      <div className="text-center">
        <h3 className="text-white ms-3">Dashboard</h3>
        <h3 className="text-white me-5">
          {currentTime.format("MMMM Do YYYY, h:mm a")}
        </h3>
      </div>
      <ErrorAlert error={error} />
      <ErrorAlert error={tablesError} />
      <div className="container text-center ">
        <ReservationsList
          reservations={reservations}
          dateToDisplayReservationsOn={dateToDisplayReservationsOn}
          setDateToDisplayReservationsOn={setDateToDisplayReservationsOn}
          todaysDate={todaysDate}
          setDateParam={setDateParam}
          dateParam={dateParam}
        />
        <TablesList tables={tables} reservations={reservations} />
      </div>
    </main>
  );
}

export default Dashboard;
