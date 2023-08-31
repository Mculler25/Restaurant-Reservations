import React from 'react';
import Reservation from './Reservation';

const ReservationsList = ({reservations}) => {
    
    return (
        <section>
            {reservations.map((reservation) => <Reservation key={reservation.mobile_number} reservation={reservation} />)}
        </section>
    )
}

export default ReservationsList;