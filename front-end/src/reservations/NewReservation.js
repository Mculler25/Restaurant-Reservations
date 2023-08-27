import React, { useState } from 'react';
import ReservationForm from './ReservationForm';
import { createReservation } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const NewReservation = ({setReservations, reservations}) => {
    const [newReservationError , setNewReservationError ] = useState(null);
    const history = useHistory()
    const initialFormData = {
        first_name : '',
        last_name : '',
        mobile_number : '',
        reservation_date : '',
        reservation_time : '',
        people : ''
    }

    const submitHandler = async(formData) => {
        try {
            const data = await createReservation(formData);
            setReservations([...reservations, data]);
            await history.push('/dashboard');  
        } catch (error) {
            setNewReservationError(error)
        }
    }
    return (
        <section>
            <ReservationForm 
                headerText="Create New Reservation"
                initialFormData={initialFormData}
                submitHandler={submitHandler}
            />
            <ErrorAlert error={newReservationError} />
        </section>
    )
}

export default NewReservation;