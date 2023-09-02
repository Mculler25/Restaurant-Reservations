import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ReservationForm = ({ initialFormData, headerText, submitHandler }) => {
  const [formData, setFormData] = useState({ ...initialFormData });
  const history = useHistory();

  //useEffect to handle initialFormData coming in as {} at first
  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  // change the form data when the use types something in
  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // change people from string to number
    formData.people = parseInt(formData.people);
    console.log(formData)
    submitHandler(formData);
    // set formData back to the initialFormData
    setFormData({ ...initialFormData });
  };

  // when use hits cancel go back to previous page
  const handleCancel = () => {
    history.goBack();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="border rounded border-danger text-white p-3 m-4"
    >
      <h2 className="text-center mb-5">{headerText}</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="m-3">
            <label htmlFor="first_name" className="text-center">
              First Name:{" "}
            </label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              required
              value={formData.first_name}
              onChange={handleInput}
              className="m-3 bg-dark text-white"
            />
          </div>
          <div className="m-3">
            <label htmlFor="reservation_time">Reservation Time: </label>
            <input
              type="time"
              name="reservation_time"
              id="reservation_time"
              required
              value={formData.reservation_time}
              onChange={handleInput}
              className="m-3 bg-dark text-white"
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="m-3">
            <label htmlFor="last_name">Last Name: </label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              required
              value={formData.last_name}
              onChange={handleInput}
              className="m-3 bg-dark text-white"
            />
          </div>
          <div className="m-3">
            <label htmlFor="reservation_date">Reservation Date: </label>
            <input
              type="date"
              name="reservation_date"
              id="reservation_date"
              required
              value={formData.reservation_date}
              onChange={handleInput}
              className="m-3 bg-dark text-white"
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="m-3">
            <label htmlFor="mobile_number">mobile_number: </label>
            <input
              type="tel"
              name="mobile_number"
              id="mobile_number"
              required
              value={formData.mobile_number}
              onChange={handleInput}
              className="m-3 bg-dark text-white"
            />
          </div>
          <div className="m-3">
            <label htmlFor="people">Amount of People: </label>
            <input
              type="number"
              min="1"
              max="20"
              name="people"
              id="people"
              required
              value={formData.people}
              onChange={handleInput}
              className="m-3 bg-dark text-white"
            />
          </div>
        </div>
      </div>
      <div className="text-center m-3">
        <button type="submit" className="btn btn-danger m-3">
          Submit
        </button>
        <button onClick={handleCancel} className="btn btn-danger m-3">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ReservationForm;
