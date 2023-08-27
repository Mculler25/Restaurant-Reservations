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
function Dashboard({ reservations, error, tables }) {
  const [currentTime, setCurrentTime ] = useState(moment())

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(moment());
    }, 60000); 

    return () => {
      clearInterval(timeInterval);
    };
  },[])

  

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <h4>{currentTime.format('MMMM Do YYYY, h:mm a')}</h4>
      <ErrorAlert error={error} />
      
      <ReservationsList reservations={reservations} />
    
      <TablesList tables={tables} />
    </main>
  );
}

export default Dashboard;
