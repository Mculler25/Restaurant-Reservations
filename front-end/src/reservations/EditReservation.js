import React , { useEffect, useState } from 'react';
import ReservationForm from './ReservationForm';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { readReservations, updateReservation } from '../utils/api';
import { formatAsTime } from '../utils/date-time';
import ErrorAlert from '../layout/ErrorAlert';

const EditReservation = () => {
    const { reservationId } = useParams();
    const history = useHistory();
    const [matchingReservation , setMatchingReservation ] = useState({})
    const [matchingReservationError, setMatchingReservationError] = useState(null);
    useEffect(() => {
        const abortController = new AbortController();
        readReservations(reservationId, abortController.signal)
            .then(setMatchingReservation)
            .catch(setMatchingReservationError)
        return () => abortController.abort();
    },[reservationId])
    
    const submitHandler = async (formData) => {
        
        try {
            formData.reservation_time = await formatAsTime(formData.reservation_time)
            await updateReservation(formData)
            history.push("/dashboard")
        } catch (error) {
            setMatchingReservationError(error)
        }
    }
    
    return (
    <section>
        <ReservationForm 
        headerText="Edit Reservation"
        initialFormData={matchingReservation}
        submitHandler={submitHandler}
        />
        <ErrorAlert error={matchingReservationError} />
    </section>
    )
}

export default EditReservation;