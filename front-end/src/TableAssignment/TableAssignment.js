import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { createTableAssignment } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

const TableAssignment = ({ tables }) => {
  const { reservationId } = useParams();
  const history = useHistory();

  const initialFormData = {
    table_id: Infinity,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [tableAssignmentError, setTableAssignmentError] = useState(null);

  // set the formData to what user inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  // on submit create a table assignment
  const handleSubmit = async (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    try {
      await createTableAssignment(
        reservationId,
        formData.table_id,
        abortController.signal
      );
      setFormData(initialFormData);
      // return use to dashboard
      await history.push(`/dashboard`);
    } catch (error) {
      setTableAssignmentError(error);
    }

    return () => abortController.abort;
  };

  // if user hits cancel return them to dashboard
  const handleCancel = () => {
    history.push("/dashboard");
  };
  return (
    <section className="border rounded border-danger text-white p-3 m-4">
      <form onSubmit={handleSubmit}>
        <h2 className="text-center mb-5">Choose A Table</h2>
        <div className="m-5 text-center">
          <select
            name="table_id"
            id="table_id"
            value={formData.table_id}
            onChange={handleChange}
            className="m-3 bg-dark text-white"
          >
            <option value="tables">Tables</option>
            {tables.map((table) => {
              return (
                <option key={table.table_name} value={table.table_id}>
                  {table.table_name} - {table.capacity}
                </option>
              );
            })}
          </select>
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
      <ErrorAlert error={tableAssignmentError} />
    </section>
  );
};

export default TableAssignment;
