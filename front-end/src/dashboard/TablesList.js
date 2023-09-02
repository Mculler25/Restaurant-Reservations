import React from "react";
import Table from "./Table";

const TablesList = ({tables, reservations}) => {
    // map over the tables to display each table
    return (
        <section>
            <h1 className="text-white m-2">Tables</h1>
            {tables.map((table) => <Table key={table.table_id} table={table} reservations={reservations}/>)}
        </section>
    )
}

export default TablesList