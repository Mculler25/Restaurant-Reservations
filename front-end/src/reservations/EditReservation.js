import React, { useEffect, useState } from "react";
import ReservationForm from "./ReservationForm";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readReservations, updateReservation } from "../utils/api";
import { formatAsTime } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";

const EditReservation = () => {
  const { reservationId } = useParams();
  const history = useHistory();
  const [matchingReservation, setMatchingReservation] = useState({});
  const [matchingReservationError, setMatchingReservationError] =
    useState(null);

  // fetch the reservation that matches reservation id in the params
  useEffect(() => {
    const abortController = new AbortController();
    const getMatchingReservation = async () => {
      try {
        const response = await readReservations(
          reservationId,
          abortController.signal
        );
        setMatchingReservation(response);
      } catch (error) {
        setMatchingReservationError(error);
      }
    };
    getMatchingReservation();
    return () => abortController.abort();
  }, [reservationId]);

  // on submit update reservation
  const submitHandler = async (formData) => {
    try {
      // change time into string backend can use
      formData.reservation_time = await formatAsTime(formData.reservation_time);
      await updateReservation(formData);
      // push user back to dashboard showing reservations on the newly edited reservation date
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      setMatchingReservationError(error);
    }
  };

  return (
    <section>
      <ReservationForm
        headerText="Edit Reservation"
        initialFormData={matchingReservation}
        submitHandler={submitHandler}
      />
      <ErrorAlert error={matchingReservationError} />
    </section>
  );
};

export default EditReservation;
