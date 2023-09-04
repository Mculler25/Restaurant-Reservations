import React, { useEffect, useState } from "react";
import { deleteTableAssignemnt, readReservations } from "../utils/api";
import winston from "winston/lib/winston/config";
import ErrorAlert from "../layout/ErrorAlert";


const Table = ({ table }) => {
  const [reservationAtTable, setReservationAtTable] = useState(null);
  const [reservationAtTableError , setReservationAtTableError] = useState(null)
  const [deleteError , setDeleteError ] = useState(null);
  // fetch the reservation at the table
  useEffect(() => {
    const getReservationAtTable = async () => {
      if (table.reservation_id) {
        try {
          const data = await readReservations(table.reservation_id);
          setReservationAtTable(data);
        } catch (error) {
          //log error
          winston.debug(`This error occured in the Table file : ${error.message}`)
          //set error
          setReservationAtTableError(error)
        }
      }
    };
    getReservationAtTable();
  }, [table.reservation_id]);

  // when the customer leaves delete the table assignment to free table
  const handleCustomerLeaving = async () => {
    const abortController = new AbortController();
    try {
      if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
        await deleteTableAssignemnt(table.table_id, abortController.signal);
        // refresh the page to show new table status
        window.location.reload()
      }
    } catch (error) {
      // log the error
      winston.debug(`This error occured in the Table File : ${error.message}`)
      // set the error
      setDeleteError(error)
    }

    return () => abortController.abort();
  };

  return (
    <section className="border rounded border-danger text-white text-center p-5 m-4">
      <h2>Table Name : {table.table_name}</h2>
      <h2>Capacity : {table.capacity}</h2>
      {/* if there is a reservation assigned to the table, display it */}
      {table.reservation_id ? (
        <>
          <p data-table-id-status={table.table_id}>Table Status : occupied</p>
          <div className="border rounded border-danger p-5 m-4">
            <h3>
              {reservationAtTable.last_name}, {reservationAtTable.first_name}
            </h3>
            <p className="m-3">People : {reservationAtTable.people}</p>
            <p data-reservation-id-status={reservationAtTable.reservation_id}>
              Status : {reservationAtTable.status}
            </p>
            <button
              data-table-id-finish={table.table_id}
              onClick={handleCustomerLeaving}
              className="btn btn-danger m-3"
            >
              Finish
            </button>
            <ErrorAlert error={deleteError} />
            <ErrorAlert error={reservationAtTableError} />
          </div>
        </>
      ) : (
        <p data-table-id-status={table.table_id}>Table Status : free</p>
      )}
    </section>
  );
}

export default Table;