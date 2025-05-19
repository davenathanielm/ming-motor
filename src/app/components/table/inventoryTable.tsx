import { TableColumn } from "react-data-table-component";
import { Inventory } from "../../../../models/inventoryModel/inventoryModel";
import { IconButtonTable } from "./productTable";
import { productIcon } from "../items/image";

export const inventoryColumns = (
    onUpdate: (id: any) => void,
    onDelete: (id: any, name: string) => void,
): TableColumn<Inventory>[] => [
    {
        name: "No",
        cell: (_, index) => (
            <div className="text-center">{index + 1}</div>
        )
    },
    {
        name: "Lokasi",
        selector: (row) => row.location,
        sortable: true,
        cell: (row) => (
            <div className="text-center whitespace-normal break-words">{row.location}</div>
        )
    },
    {
        name: "Deskripsi",
        selector: (row) => row.description,
        sortable: true,
        minWidth: "50px"
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
                {/* <IconButtonTable
                icon={productIcon.info}
                title="Lihat Detail"
                onClick={() => onDetail(row)}
                /> */}
                <IconButtonTable
                icon={productIcon.pen}
                title="Edit gudang"
                onClick={() => onUpdate(row)}
                />
                <IconButtonTable
                icon={productIcon.bin}
                title="Hapus gudang"
                onClick={() => onDelete(row.id_inventory, row.location)}
                />
            </div>
        )
    }
]