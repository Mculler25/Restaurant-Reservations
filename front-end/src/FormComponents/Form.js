import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Form = ({ initialFormData, headerText, submitHandler }) => {
  const [formData, setFormData] = useState(initialFormData);
  const history = useHistory();

 

  const handleInput = (e) => {
    setFormData({
        ...formData ,
        [e.target.name] : e.target.value
    })
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    formData.people = parseInt(formData.people)
    submitHandler(formData);
    setFormData({...formData})
  }

  return (
    <form onSubmit={handleFormSubmit} >
        <h2>{headerText}</h2>
        <label htmlFor="first_name">First Name</label>
        <input type='text' name='first_name' id='first_name' value={formData.first_name} onChange={handleInput}/>
        <label htmlFor="last_name">Last Name</label>
        <input type='text' name='last_name' id='last_name' value={formData.last_name} onChange={handleInput}/>
        <label htmlFor="mobile_number">Mobile Number</label>
        <input type='text' name="mobile_number" id="mobile_number" value={formData.mobile_number} onChange={handleInput}/>
        <label htmlFor="reservation_date">Reservation Date</label>
        <input type='text' name="reservation_date"  id="reservation_date" value={formData.reservation_date} onChange={handleInput}/>
        <label htmlFor="reservation_time">Reservation Time</label>
        <input type='text' name="reservation_time" id="reservation_time" value={formData.reservation_time} onChange={handleInput}/>
        <label htmlFor="people">Amount of People</label>
        <input type='number' min='1' max='20' name="people" id="people" value={formData.people} onChange={handleInput}/>
        <input type='submit' />
        <button onClick={() => history.goBack()}>Cancel</button>
    </form>
  )
};

export default Form;
