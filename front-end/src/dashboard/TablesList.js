import React from "react";
import Table from "./Table";

export default function TablesList({tables}){
    return (
        <section>
            {tables.map((table, index) => <Table key={index} table={table} />)}
        </section>
    )
}