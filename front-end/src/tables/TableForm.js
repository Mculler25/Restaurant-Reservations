import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function TableForm({ initialFormData, headerText, submitHandler }) {
  const [formData, setFormData] = useState(initialFormData);
  const history = useHistory();

  // set formDate to what user inputs
  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // set capacity to a integer
    formData.capacity = parseInt(formData.capacity);
    submitHandler(formData);
    // reset formData
    setFormData({ ...initialFormData });
  };

  // if user hits cancel return to previous page
  const handleCancel = () => {
    history.goBack();
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="border rounded border-danger text-white p-3 m-4 d-flex justify-content-center align-items-center"
    >
      <h2 className="m-5">{headerText}</h2>
      <div className="row">
        <div className="col-md-4 text-center">
          <div className="me-3">
            <label htmlFor="table_name">Table Name: </label>
            <input
              type="text"
              name="table_name"
              id="table_name"
              required
              value={formData.table_name}
              onChange={handleInput}
              className="m-3 bg-dark text-white"
            />
          </div>
        </div>
        <div className="col-md-4 text-center">
          <div className="me-3">
            <label htmlFor="capacity">Capacity</label>
            <input
              type="number"
              name="capacity"
              id="capacity"
              required
              value={formData.capacity}
              onChange={handleInput}
              className="m-3 bg-dark text-white"
            />
          </div>
        </div>
      </div>
      <div className="text-center me-3">
        <button type="submit" className="btn btn-danger m-3">
          Submit
        </button>
        <button onClick={handleCancel} className="btn btn-danger m-3">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TableForm;
