import { Transaction } from "../../../../models/transactionModel/transactionModel";
import { TableColumn } from "react-data-table-component";
import { formatCurrency } from "./customDesignTable";
import { IconButtonTable } from "./productTable";
import { productIcon } from "../items/menuIcon";
import Image from "next/image";

export const summaryTransactionColumns = (
  onDetail: (transaction: Transaction) => void
): TableColumn<Transaction>[] => [
  {
    name: "No",
    cell: (_, index) => <div className="text-center">{index + 1}</div>
  },

  {
    name: "Invoice",
    selector: (row) => row.invoice_number ?? "-",
  },
  {
    name : "Jumlah Barang Terjual",
    selector: (row) => row.total_amount,
    sortable: true,
  },
  {
    name : "Jumlah Pendapatan",
    selector: (row) => row.total_price,
    cell: (row) => formatCurrency(row.total_price),
    sortable: true
  },
  {
    name: "Metode Pembayaran",
    selector: (row) => row.payment_method ?? "-",
    sortable: true
  },
  {
    name: "Tanggal Transaksi",
    selector: (row) => new Date(row.transaction_date).toLocaleDateString("id-ID"),
    sortable: true
  },
  {
    name: "Aksi",
    cell: (row) => (
      <div className="flex items-center gap-2">
            <IconButtonTable
            icon={productIcon.info}
            title="Lihat Detail"
            onClick={() => onDetail(row)}
            />
        </div>
    )
  }
];