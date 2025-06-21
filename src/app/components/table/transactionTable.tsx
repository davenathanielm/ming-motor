import { formatCurrency } from "./customDesignTable";
import { TableColumn } from "react-data-table-component";


export const Transactioncolumns = (

) : TableColumn<any>[] => [
    {
        name: "No",
        cell: (_, index) => (
        <div className="text-center">{index + 1}</div>
        )
    },
    {
        name: "Barcode",
        selector: (row) => row.barcode ?? "-"
    },
    {
        name: "Nama",
        selector: (row) => row.name,
        sortable: true,
        cell: (row) => (
        <div className="text-center whitespace-normal break-words">{row.name}</div>
        )
    },
    {
        name: "Jumlah",
        selector: (row) => row.qty,
        sortable: true,
        minWidth: "50px"
    },
    {
        name: "HPP",
        selector: (row) => Number(row.hpp),
        sortable: true,
        cell: (row) => formatCurrency(row.hpp)
    },
    {
        name: "Harga Jual",
        cell: (row) => formatCurrency(row.selling_price),
        selector: (row) => Number(row.selling_price),
        sortable: true
    },
    {
        name: "Tanggal Dibuat",
        selector: (row) =>
        new Date(row.created_at).toLocaleDateString("id-ID")
    }
]