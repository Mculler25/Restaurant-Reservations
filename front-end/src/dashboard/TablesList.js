import React from "react";
import Table from "./Table";

export default function TablesList({tables}){
    return (
        <section>
            {tables.map((table) => <Table key={table.table_name} table={table}/>)}
        </section>
    )
}