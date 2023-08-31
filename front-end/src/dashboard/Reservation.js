import React from 'react';


const Reservation = ({reservation}) => {
    const {  reservation_id, first_name , last_name, mobile_number, reservation_date, reservation_time, people, status } = reservation;

    return (
        <>
        {
            status !== "finished" ?
                <div className='border border-primary'>
                    <h3>{last_name}, {first_name}</h3>
                    <p>mobile-number : {mobile_number}</p>
                    <p>reservation date :{reservation_date}</p>
                    <p>reservation time : {reservation_time}</p>
                    <p>people : {people}</p>
                    <p data-reservation-id-status={reservation_id}>status : {status}</p>
                    {
                        status === "booked" ? 
                            <button type='submit'>
                                <a href={`/reservations/${reservation_id}/seat`}>
                                    Seat
                                </a>
                            </button>
                        :
                        null
                    }
                </div>
                :
                null
        }
        </>
    )
}

export default Reservation;