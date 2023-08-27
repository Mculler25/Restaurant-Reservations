import React from 'react';


const Reservation = ({reservation}) => {
    const {  reservation_id, first_name , last_name, mobile_number, reservation_date, reservation_time, people } = reservation;

    

    return (
        <div className='border border-primary'>
            <h3>{last_name}, {first_name}</h3>
            <p>mobile-number : {mobile_number}</p>
            <p>reservation date :{reservation_date}</p>
            <p>reservation time : {reservation_time}</p>
            <p>people : {people}</p>
            <button>
                <a href={`/reservations/${reservation_id}/seat`}>
                    Seat
                </a>
            </button>
        </div>
    )
}

export default Reservation;