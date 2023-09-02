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
        <section className="border rounder border-danger text-white m-3">
            <form onSubmit={onSubmit}>
                <h1 className="m-5 text-center">Search By Mobile Number</h1>
                <div className="text-center">
                    <label htmlFor="mobile_number">Mobile Number: </label>
                    <input type="tel" name="mobile_number" id="mobile_number" value={formData.mobile_number} onChange={handleChange} className="m-3 bg-dark text-white"/>
                </div>
                <div className="text-center m-3">
                    <button type="submit" className="btn btn-danger m-2">Find</button>
                </div>
            </form>
            {
                reservationByNumber.length !== 0 ?
                    <section className="text-center">
                        <ReservationsList reservations={reservationByNumber} />
                    </section>
                :
                <h3 className="text-center m-5">No reservations found</h3>
            }
            <ErrorAlert error={reservationByNumberError} />
        </section>
    )
}

export default SearchNumber;