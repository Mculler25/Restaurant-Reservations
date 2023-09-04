import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NewReservation from "../reservations/NewReservation";
import NewTable from "../tables/NewTable";
import TableAssignment from "../TableAssignment/TableAssignment";
import NotFound from "./NotFound";
import { listReservations, listTables } from "../utils/api";
import { useLocation } from "react-router-dom";
import SearchNumber from "../search/SearchNumber";
import EditReservation from "../reservations/EditReservation";
import winston from "winston/lib/winston/config";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesErrors] = useState(null);
  const [dateToDisplayReservationsOn, setDateToDisplayReservationsOn] = useState(date);
  const [dateParam, setDateParam] = useState(null);

  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const getDateParam = queryParam.get("date");

  // if there is a dateParam enter save it
  useEffect(() => {
    setDateParam(getDateParam);
  }, [getDateParam]);

  // fetch reservations by date
  // if there is a date param entered get reservations by that date
  // if there is not date param entered get reservations by the date that is showing
  useEffect(() => {
    const abortController = new AbortController();
    if (dateParam) {
      const getReservationsByDateParam = async () => {
        try {
          const response = await listReservations(dateParam, abortController.signal)
          setReservations(response)
        } catch (error) {
          winston.debug(`This error occured in the Routes File: ${error.message}`)
          setReservationsError(error)
        }
      }
      getReservationsByDateParam();
    } else {
      const getReservationsByDateDisplayed = async () => {
        try {
          const response = await listReservations(dateToDisplayReservationsOn, abortController.signal)
          setReservations(response)
        } catch (error) {
          winston.debug(`This error occured in the Routes File: ${error.message}`)
          setReservationsError(error)
        }
      }
      getReservationsByDateDisplayed();
    }
    return () => abortController.abort();
  }, [date, dateParam, dateToDisplayReservationsOn, location.pathname]);

  // fetch tables 
  useEffect(() => {
    const abortController = new AbortController();
    const getTables = async () => {
      try {
        const response = await listTables(abortController.signal);
        setTables(response)
      } catch (error) {
        winston.debug(`This error occured in the Routes File: ${error.message}`)
        setTablesErrors(error)
      }
    }
    getTables();
    return () => abortController.abort();
  }, [date, location.pathname]);

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard
          date={date}
          reservations={reservations}
          error={reservationsError}
          tables={tables}
          tablesError={tablesError}
          dateToDisplayReservationsOn={dateToDisplayReservationsOn}
          setDateToDisplayReservationsOn={setDateToDisplayReservationsOn}
          todaysDate={date}
          setDateParam={setDateParam}
          dateParam={dateParam}
        />
      </Route>
      <Route path="/reservations/new">
        <NewReservation
          setReservations={setReservations}
          reservations={reservations}
        />
      </Route>
      <Route path="/tables/new">
        <NewTable tables={tables} setTables={setTables} />
      </Route>
      <Route path="/reservations/:reservationId/seat">
        <TableAssignment
          tables={tables}
          setTables={setTables}
          dateToDisplayReservationsOn={dateToDisplayReservationsOn}
          dateParam={dateParam}
        />
      </Route>
      <Route path="/search">
        <SearchNumber />
      </Route>
      <Route path="/reservations/:reservationId/edit">
        <EditReservation />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
