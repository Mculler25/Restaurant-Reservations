import React from "react";
import { updateStatus } from "../utils/api";
import { Link } from  "react-router-dom/cjs/react-router-dom.min";

const Reservation = ({ reservation }) => {
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    status,
  } = reservation;

  // if user hit cancel, confirm thats what they would like to do
  // then update the reservation status to be "cancelled"
  const handleCancel = async () => {
    const abortController = new AbortController();
    if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
      await updateStatus(reservation_id, abortController.signal);
      // reload page to update reservations showing
      window.location.reload();
    }
    return () => abortController.abort();
  };

  return (
    <>
      {status === "booked" ? (
        <div className="border rounded border-danger text-white text-center p-5 m-4">
          <h3>
            {last_name}, {first_name}
          </h3>
          <p>mobile-number : {mobile_number}</p>
          <p>reservation date :{reservation_date}</p>
          <p>reservation time : {reservation_time}</p>
          <p>people : {people}</p>
          <p data-reservation-id-status={reservation_id}>status : {status}</p>
          <button type="submit" className="btn btn-danger m-3">
            <Link to={`/reservations/${reservation_id}/seat`} className="text-white">
              Seat
            </Link>
          </button>
          <button className="btn btn-danger m-3">
            <Link to={`/reservations/${reservation_id}/edit`} className="text-white">
              Edit
            </Link>
          </button>
          <button
            data-reservation-id-cancel={reservation.reservation_id}
            onClick={handleCancel}
            className="btn btn-danger m-3"
          >
            Cancel
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Reservation;
