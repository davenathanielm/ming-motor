import { SupplierSummary } from "../../../../models/detail_supplier/detail_supplier";
import { TableColumn } from "react-data-table-component";
import { formatCurrency } from "./customDesignTable";
import { IconButtonTable } from "./productTable";
import { productIcon } from "../items/menuIcon";

export const detailSupplierColumns = (
    onDetail: (supplier: SupplierSummary) => void
): TableColumn<SupplierSummary>[] =>
     [
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
            name: "Nama Produk",
            selector: (row) => row.name,
            sortable: true,
            cell: (row) => (
                <div className="text-center whitespace-normal break-words">{row.name}</div>
            )
        },

        {
            name: "Nama Supplier",
            selector: (row) => row.supplier_name,
            sortable: true,
            cell: (row) => (
                <div className="text-center whitespace-normal break-words">{row.supplier_name}</div>
            )
        },

        {
            name: "No Telepon",
            selector: (row) => row.phone_number,
            sortable: true,
            cell: (row) => (
                <div className="text-center whitespace-normal break-words">{row.phone_number}</div>
            )
        },
        
        // {
        //     name: "Kota Supplier",
        //     selector: (row) => row.city,
        //     sortable: true,
        //     cell: (row) => (
        //         <div className="text-center whitespace-normal break-words">{row.city}</div>
        //     )
        // },

        {
            name: "Jumlah Barang",
            selector: (row) => row.qty,
            sortable: true,
            cell: (row) => (
                <div className="text-center whitespace-normal break-words">{row.qty}</div>
            )
        },

        {
            name : "Total Jumlah Barang",
            selector: (row) => row.total_qty,
            sortable: true,
            cell: (row) => (
                <div className="text-center whitespace-normal break-words">{row.total_qty}</div>
            )
        },

        {
            name: "HPP",
            cell: (row) => formatCurrency(row.hpp),
            selector: (row) => Number(row.hpp),
            sortable: true
        },
     
        {
            name: "Tanggal Laporan Dibuat",
            selector: (row) =>new Date(row.created_at).toLocaleDateString("id-ID"),
            sortable: true,
        },
        {
            name : "Action",
            cell :(row) => (
                <div className="flex items-center gap-2">
                    <IconButtonTable
                        icon={productIcon.info}
                        title="Lihat Detail"
                        onClick={() => onDetail(row)}
                    />
                    {/* <IconButtonTable
                        icon={productIcon.pen}
                        title="Edit Produk"
                        onClick={() => onUpdate(row)}   
                    /> */}
                    {/* <IconButtonTable
                        icon={productIcon.bin}
                        title="Hapus Produk"
                        onClick={() => onDelete(row.id_supplier, row.supplier_name)}
                    /> */}
                </div>
            )
            
        }

        // {
        //     name: "Tanggal Produk diperbarui",
        //     selector: (row) =>
        //         new Date(row.updated_at).toLocaleDateString("id-ID")
        // }
     ]