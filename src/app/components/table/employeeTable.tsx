import { Employee } from "../../../../models/employeeModel/employeeModel";
import { TableColumn } from "react-data-table-component";
import { formatDate } from "../items/date";
import { IconButtonTable } from "./productTable";
import { productIcon } from "../items/image";

export const employeeColumns = (
    onUpdate : (id:any) => void,
    onDelete : (id:any, name:string) => void,
    onDetail: (employee: Employee) => void,
): TableColumn<Employee>[] => [
    {
        name: "No",
        cell: (_, index) => (
            <div className="text-center">{index + 1}</div>
        )
    },
    {
        name: "Nama",
        selector: (row) => row.full_name,
        sortable: true,
        cell: (row) => (
            <div className="text-center whitespace-normal break-words">{row.full_name}</div>
        )
    },
    {
        name: "No Telepon",
        selector: (row) => row.phone,
        sortable: true,
    },
    {
        name: "Alamat",
        selector: (row) => row.address,
        sortable: true,
    },
    {
        name: "Posisi",
        selector: (row) => row.position,
        sortable: true,
    },
    {
        name: "Tanggal Bergabung",
        selector: (row) => formatDate(row.join_date),
        sortable: true,
    },
    {
        name: "Tanggal Dibuat",
        selector: (row) => formatDate(row.created_at),
        sortable: true,
    },
    {
        name: "Aksi",
        cell: (row) => (
            <div className="flex justify-center">
                <IconButtonTable
                    title="Detail"
                    icon={productIcon.info}
                    onClick={() => onDetail(row)}
                />
                <IconButtonTable
                    title="Edit"
                    icon={productIcon.pen}
                    onClick={() => onUpdate(row)}
                />
                <IconButtonTable
                     title="Hapus"
                    icon={productIcon.bin}
                    onClick={() => onDelete(row.id, row.full_name)}
                />
            </div>
        )
    }
];