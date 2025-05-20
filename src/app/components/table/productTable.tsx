import { Product } from "../../../../models/productModel/productModel";
import { TableColumn } from "react-data-table-component";
import { getStatusColor } from "../items/formTemplate";
import { formatCurrency } from "./customDesignTable";
import { productIcon } from "../items/image";
import { roleFilterOwner } from "@/app/utils/roleFilter";
import Image from "next/image";

// Columns definition
export const Productcolumns = (
  onUpdate: (id: any) => void,
  onDelete: (id: any, name: string) => void,
  onDetail: (product: Product) => void,
  role : string
): TableColumn<Product>[] => [
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
    cell: (row) => {
      if(!roleFilterOwner(role)) return "***************";
      return formatCurrency(row.hpp)
    }
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
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    cell: (row) => (
      <div className={getStatusColor(row.status)}>{row.status || "Menunggu"}</div>
    )
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
          onClick={() => onUpdate(row.id_product)}
        />
        <IconButtonTable
          icon={productIcon.bin}
          title="Hapus Produk"
          onClick={() => onDelete(row.id_product, row.name)}
        />
      </div>
    )
  }
];

// 🔹 Reusable Icon Button
export const IconButtonTable = ({
  icon,
  title,
  onClick
}: {
  icon: any;
  title: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    title={title}
    className="p-1 rounded hover:bg-gray-200 transition"
  >
    <Image src={icon} alt={title} width={20} height={20} />
  </button>
);
