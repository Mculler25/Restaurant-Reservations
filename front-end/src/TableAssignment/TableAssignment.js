import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min' 
import { createTableAssignment } from '../utils/api';
import ErrorAlert from '../layout/ErrorAlert';

const TableAssignment = ({tables, setTabels}) => {
    const { reservationId } = useParams();
    const history = useHistory();

    const initialFormData = {
        table_id : Infinity
    }

    const [formData , setFormData] = useState(initialFormData)
    const [tableAssignmentError ,setTableAssignmentError] = useState(null)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const abortController = new AbortController()
        try {
            await createTableAssignment(reservationId, formData.table_id, abortController.signal)
            setFormData(initialFormData)
            history.push("/dashboard")
        } catch (error) {
            setTableAssignmentError(error)
        }

        return () => abortController.abort;
    }

    const handleCancel = () => {
        history.push("/dashboard");
    }
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label htmlFor='table_id'>Choose A Table</label>
                <select name='table_id' id='table_id' value={formData.table_id} onChange={handleChange}>
                    <option value="tables">Tables</option>
                    {
                        tables.map((table) => {
                            return (
                                <option key={table.table_name} value={table.table_id} >
                                    {table.table_name} - {table.capacity}
                                    </option>
                            )
                        })
                    }
                </select>
                <button type="submit">Submit</button>
                <button onClick={handleCancel}>Cancel</button>
            </form>
            <ErrorAlert error={tableAssignmentError} />
        </section>
    )
}

export default TableAssignment;