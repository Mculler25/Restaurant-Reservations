import React, { useState } from "react";
import ReservationForm from "./ReservationForm";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const NewReservation = ({ setReservations, reservations }) => {
  const [newReservationError, setNewReservationError] = useState(null);
  const history = useHistory();
  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  // on submit create a resevation
  const submitHandler = async (formData) => {
    try {
      console.log(formData)
      const data = await createReservation(formData);
      // add new reservation to all reservations shown
      setReservations([...reservations, data]);
     // push user back to dashboard showing the reservations with new reservation date
      await history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      setNewReservationError(error);
    }
  };
  return (
    <section>
      <ReservationForm
        headerText="Create New Reservation"
        initialFormData={initialFormData}
        submitHandler={submitHandler}
      />
      <ErrorAlert error={newReservationError} />
    </section>
  );
};

export default NewReservation;
