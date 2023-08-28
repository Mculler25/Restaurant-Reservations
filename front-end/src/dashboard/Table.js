import React from 'react';

export default function Table({table}){
    return (
        <section className='border border-primary'>
            <h2>Table Name : {table.table_name}</h2>
            <h2>Capacity : {table.capacity}</h2>
            {table.reservation_id ? 
            <p data-table-id-status={table.table_id}>Table Status : Occupied</p>
            : 
            <p data-table-id-status={table.table_id}>Table Status : Free</p>
            }
        </section>
    )
}