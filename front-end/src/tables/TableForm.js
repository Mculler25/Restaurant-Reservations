import React, {useState} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function TableForm({ initialFormData, headerText, submitHandler}){
    const [formData, setFormData ] = useState(initialFormData)
    const history = useHistory();

    const handleInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        formData.capacity = parseInt(formData.capacity)
        submitHandler(formData);
        setFormData({...initialFormData})
    }

    const handleCancel = () => {
        history.goBack()
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <h2>{headerText}</h2>
            <label htmlFor="table_name">Table Name</label>
            <input type="text" name="table_name" id="table_name" required value={formData.table_name} onChange={handleInput} />
            <label htmlFor='capacity'>Capacity</label>
            <input type='number' name="capacity" id="capacity" required value={formData.capacity} onChange={handleInput} />
            <button type='submit'>Submit</button>
            <button onClick={handleCancel}>Cancel</button>
        </form>
    )
}

export default TableForm;