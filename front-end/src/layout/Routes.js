import React , {useState, useEffect} from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NewReservation from "../reservations/NewReservation";
import NewTable from "../tables/NewTable";
import TableAssignment from "../TableAssignment/TableAssignment";
import NotFound from "./NotFound";
import { listReservations, listTables } from "../utils/api";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import SearchNumber from "../search/SearchNumber";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes({date}) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([])
  const [tablesError, setTablesErrors ] = useState(null);
  


  const location = useLocation();
  const queryParam = new URLSearchParams(location.search)
  const dateParam = queryParam.get("date")
 

  useEffect(loadDashboard, [date , dateParam, location.pathname]);
  
  function loadDashboard() {
    const abortController = new AbortController();
    listReservations(dateParam, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  useEffect(() => {
    const abortController = new AbortController();
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesErrors);
    return () => abortController.abort();
  },[date, location.pathname])

  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={date} reservations={reservations} error={reservationsError} tables={tables} tablesError={tablesError} />
      </Route>
      <Route path='/reservations/new'>
        <NewReservation setReservations={setReservations} reservations={reservations}/>
      </Route>
      <Route path="/tables/new">
        <NewTable tables={tables} setTables={setTables} />
      </Route>
      <Route path="/reservations/:reservationId/seat">
        <TableAssignment tables={tables} setTables={setTables} />
      </Route>
      <Route path="/search">
        <SearchNumber />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
