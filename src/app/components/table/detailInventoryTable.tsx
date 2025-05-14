import { InventorySummary } from "../../../../models/detail_warehouse/detail_warehouse";
import { TableColumn } from "react-data-table-component";
import { formatCurrency } from "./customDesignTable";
import { IconButtonTable } from "./productTable";
import { productIcon } from "../items/image";

export const detailInventoryColumns = (
    onDetail: (inventory: InventorySummary) => void
):TableColumn<InventorySummary>[] => [
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
        name: "Jumlah",
        selector: (row) => row.qty,
        sortable: true,
    },

      {
        name: "movement tipe",
        selector: (row) => row.movement_type,
        sortable: true,
        cell: (row) => (
            <div className="text-center whitespace-normal break-words">{row.movement_type}</div>
        )
    },

    //  {
    //     name: "movement_type",
    //     selector: (row) => row.movement_type,
    //     sortable: true,
    //     cell: (row) => (
    //         <div className="text-center whitespace-normal break-words">{row.movement_type}</div>
    //     )
    // },
    {
        name: "location",
        selector: (row) => row.location,
        sortable: true,
        cell: (row) => (
            <div className="text-center whitespace-normal break-words">{row.location}</div>
        )
    },
  
    {
        name: "Tanggal Dibuat",
        selector: (row) =>
            new Date(row.created_at).toLocaleDateString("id-ID")
    },
    {
        name : "Action",
        cell : (row) => (
            <div className="flex items-center gap-2">
                <IconButtonTable
                    icon={productIcon.info}
                    title="Lihat Detail"
                    onClick={() => onDetail(row)}
                />
            </div>
        )
    }
]