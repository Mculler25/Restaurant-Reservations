import React from 'react';
import { deleteTableAssignemnt } from '../utils/api';

export default function Table({table}){

    const handleCustomerLeaving = () => {
        const abortController = new AbortController();
        if(window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
            deleteTableAssignemnt(table.table_id, abortController.signal)
            window.location.reload();
        } 
        return () => abortController.abort();
    }
    return (
        <section className='border border-primary'>
            <h2>Table Name : {table.table_name}</h2>
            <h2>Capacity : {table.capacity}</h2>
            {table.reservation_id ? 
            <p data-table-id-status={table.table_id}>Table Status : occupied</p>
            : 
            <p data-table-id-status={table.table_id}>Table Status : free</p>
            }
            {
                table.reservation_id ? 
                <button data-table-id-finish={table.table_id} onClick={handleCustomerLeaving}>
                    Finish
                </button>
                :
                null
            }
        </section>
    )
}