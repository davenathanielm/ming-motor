import { TableColumn } from "react-data-table-component";
import { Supplier } from "../../../../models/supplierModel/supplierModel";
import { IconButtonTable } from "./productTable";
import { productIcon } from "../items/menuIcon";

export const supplierColumns = (
    onUpdate: (id: any) => void,
    onDelete: (id: any, name: string) => void,
    onDetail: (supplier: Supplier) => void
): TableColumn<Supplier>[] => [
    {
        name: "No",
        cell: (_, index) => (
            <div className="text-center">{index + 1}</div>
        )
    },
    {
        name: "Nama",
        selector: (row) => row.supplier_name,
        sortable: true,
        cell: (row) => (
            <div className="text-center whitespace-normal break-words">{row.supplier_name}</div>
        )
    },
    {
        name: "Alamat",
        selector: (row) => row.city,
        sortable: true,
        cell: (row) => (
            <div className="text-center whitespace-normal break-words">{row.city}</div>
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
    {
        name: "Tanggal Dibuat",
        selector: (row) =>
            new Date(row.created_at).toLocaleDateString("id-ID")
    },
    {
        name: "Action",
        cell: (row) => (
        <div className="flex items-center gap-2">
            <IconButtonTable
            icon={productIcon.info}
            title="Lihat Detail"
            onClick={() => onDetail(row)}
            />
            <IconButtonTable
            icon={productIcon.pen}
            title="Edit Produk"
            onClick={() => onUpdate(row)}   
            />
            <IconButtonTable
            icon={productIcon.bin}
            title="Hapus Produk"
            onClick={() => onDelete(row.id_supplier, row.supplier_name)}
            />
        </div>
        )
    }
]