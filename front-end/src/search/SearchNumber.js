import React, { useState } from "react";
import { listReservationsByPhoneNumber } from "../utils/api";
import ReservationsList from "../dashboard/ReservationsList";
import ErrorAlert from "../layout/ErrorAlert";

const SearchNumber = () => {
    const [reservationByNumber , setReservationByNumber ] = useState([]);
    const [reservationByNumberError, setReservationByNumberError] = useState(null)
    const [formData , setFormData ] = useState({
        mobile_number : ''
    })

    const handleChange = (e) => {
        setFormData({
            [e.target.name] : e.target.value
        })
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        const abortController = new AbortController();
        listReservationsByPhoneNumber(formData.mobile_number, abortController.signal)
            .then(setReservationByNumber)
            .then(setFormData({
                mobile_number : ""
            }))
            .catch(setReservationByNumberError)
        
        return () => abortController.abort();
    }
    return (
        <section>
            <form onSubmit={onSubmit}>
                <h1>Search By Mobile Number</h1>
                <label htmlFor="mobile_number">Mobile Number</label>
                <input type="tel" name="mobile_number" id="mobile_number" value={formData.mobile_number} onChange={handleChange}/>
                <button type="submit">Find</button>
            </form>
            {
                reservationByNumber.length !== 0 ?
                    <section>
                        <ReservationsList reservations={reservationByNumber} />
                    </section>
                :
                <p>No reservations found</p>
            }
            <ErrorAlert error={reservationByNumberError} />
        </section>
    )
}

export default SearchNumber;