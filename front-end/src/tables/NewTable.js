import React, { useState } from "react";
import { createTable } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import TableForm from "./TableForm";

export default function NewTable({ setTables, tables }) {
  const [newTableError, setNewTableError] = useState(null);
  const history = useHistory();
  const initialFormData = {
    table_name: "",
    capacity: "",
  };

  // on submit create a new table
  const submitHandler = async (formData) => {
    try {
      const data = await createTable(formData);
      // add the new table to the other tables saved
      setTables([...tables, data]);
      // return use to dashboard
      await history.push("/dashboard");
    } catch (error) {
      setNewTableError(error);
    }
  };
  return (
    <section>
      <TableForm
        headerText="Create New Table"
        initialFormData={initialFormData}
        submitHandler={submitHandler}
      />
      <ErrorAlert error={newTableError} />
    </section>
  );
}
