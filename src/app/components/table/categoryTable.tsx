import { TableColumn } from "react-data-table-component";
import { Category } from "../../../../models/categoryModel/categoryModel";
import { IconButtonTable } from "./productTable";
import { productIcon } from "../items/menuIcon";

export const categoryColumns = (
    onUpdate: (id: any) => void,
    onDelete: (id: any, name: string) => void,
): TableColumn<Category>[] => [
    {
        name: "No",
        cell: (_, index) => (
            <div className="text-center">{index + 1}</div>
        )
    },
    {
        name: "Kategori",
        selector: (row) => row.category_name,
        sortable: true,
        cell: (row) => (
            <div className="text-center whitespace-normal break-words">{row.category_name}</div>
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
                <IconButtonTable
                icon={productIcon.pen}
                title="Edit Kategory"
                onClick={() => onUpdate(row)}
                />
                <IconButtonTable
                icon={productIcon.bin}
                title="Hapus Kategory"
                onClick={() => onDelete(row.id_category, row.category_name)}
                />
            </div>
        )
    }
]