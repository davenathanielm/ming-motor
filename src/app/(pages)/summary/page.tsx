"use client"
import LayoutComponent from "@/app/components/layout/layoutComponent"
import { useState, useEffect, use } from "react";
import DataTable from "react-data-table-component"
import { useFetchSupplierSummary } from "../../../../lib/calledAPI/service/serviceApiSupplier"
import { detailSupplierColumns } from "@/app/components/table/detailSupplierTable"
import { detailInventoryColumns } from "@/app/components/table/detailInventoryTable";
import { useFetchInventorySummary } from "../../../../lib/calledAPI/service/serviceApiInventory";
import { SupplierSummary } from "../../../../models/detail_supplier/detail_supplier"
import { customStyles } from "@/app/components/table/customDesignTable"
import { InventorySummary } from "../../../../models/detail_warehouse/detail_warehouse";
import Modal from "@/app/components/modal/modal";
import SupplierSummaryCard from "@/app/components/card/supplier/supplierSummaryCard";
import InventorySummaryCard from "@/app/components/card/inventory/inventorySummaryCard";
import { useFetchAllTransaction } from "../../../../lib/calledAPI/service/serviceApiTransaction";
import { summaryTransactionColumns } from "@/app/components/table/summaryTransaction";
import { Transaction } from "../../../../models/transactionModel/transactionModel";
import TransactionDetailCard from "@/app/components/card/transaction/transactionDetailCard";


export default function Summary() {
  const{data: supplierSummary} = useFetchSupplierSummary();
  const{data: inventorySummary} = useFetchInventorySummary();
  const {data: transactionSummary} = useFetchAllTransaction();

  const suppliers = supplierSummary || [];
  const inventories = inventorySummary || [];
  const transactions = transactionSummary || [];

  const [selectedSupplier, setSelectedSupplier] = useState<SupplierSummary | null>(null);
  const [selectedInventory, setSelectedInventory] = useState<InventorySummary | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<any >(null);

  const [searchSummary, setSearchSummary] = useState("");
  const [searchInventory, setSearchInventory] = useState("");
  const [searchTransaction, setSearchTransaction] = useState("");
  
  const filteredData = suppliers?.filter((item :SupplierSummary) =>
    [item.barcode ?? "", item.city ?? "", item.name ?? "", item.phone_number ?? "", item.supplier_name ?? ""]
      .some((field) => field.toLowerCase().includes(searchSummary.toLowerCase()))
  );

  const filteredDataInventory = inventories?.filter((item :InventorySummary) =>
    [item.barcode ?? "", item.location ?? "", item.name ?? "", item.movement_type ?? "", item.description ?? ""]
      .some((field) => field.toLowerCase().includes(searchInventory.toLowerCase()))
  );

  const filteredDataTransaction = transactions?.filter((item :Transaction) =>
    [item.payment_method ?? "", item.invoice_number ?? ""]
      .some((field) => field.toLowerCase().includes(searchTransaction.toLowerCase()))
  );

  const handleDetailSupplier = (supplier:SupplierSummary) => {
    setSelectedSupplier(supplier);
  }

  const handleDetailInventory = (inventory:InventorySummary) => {
    setSelectedInventory(inventory);
  }

  const handleDetailTransaction = (transaction:Transaction) => {
    setSelectedTransaction(transaction.id_transaction);
  }

    return (
        <LayoutComponent title={""} subTitle={"Home / Summary"}>
          <div className="px-14 py-10">
             <header>
                <h1 className="text-black font-bold text-2xl">Laporan</h1>
                <p className="text-gray-500">Laporan untuk memantau data</p>
            </header>

            <h1 className="font-semibold text-lg text-center text-black mt-10 "> Laporan Barang Masuk</h1>
            <div className="rounded-xl shadow-md overflow-hidden text-black bg-white mt-3 border border-gray-300">
              <DataTable
                columns={detailSupplierColumns(handleDetailSupplier)}
                data={filteredData}
                pagination
                highlightOnHover
                striped
                persistTableHead
                defaultSortFieldId={1}
                // @ts-ignore
                customStyles={customStyles}
                subHeader
                subHeaderComponent={
                  <input
                      type="text"
                      placeholder="Cari laporan..."
                      className="p-2 w-1/4 my-3 border border-gray-300 text-black rounded-lg"
                      value={searchSummary}
                      onChange={(e) => setSearchSummary(e.target.value)}
                    />
                  }
              />
            </div>


            
            <h1 className="font-semibold text-lg text-center text-black mt-16 "> Laporan Gudang Penyimpanan</h1>
            <div className="rounded-xl shadow-md overflow-hidden text-black bg-white mt-3 border border-gray-300">
              <DataTable
                columns={detailInventoryColumns(handleDetailInventory)}
                data={filteredDataInventory}
                pagination
                highlightOnHover
                striped
                persistTableHead
                defaultSortFieldId={1}
                // @ts-ignore
                customStyles={customStyles}
                subHeader
                subHeaderComponent = {
                  <input
                    type="text"
                    placeholder="Cari laporan..."
                    className="p-2 w-1/4 my-3 border border-gray-300 text-black rounded-lg"
                    value={searchInventory}
                    onChange={(e) => setSearchInventory(e.target.value)}
                  />
                }
              />
            </div>


            <h1 className="font-semibold text-lg text-center text-black mt-16 "> Laporan Transaksi</h1>
            <div className="rounded-xl shadow-md overflow-hidden text-black bg-white mt-3 border border-gray-300">
              <DataTable
                columns={summaryTransactionColumns(handleDetailTransaction)}
                data={filteredDataTransaction}
                pagination
                highlightOnHover
                striped
                persistTableHead
                defaultSortFieldId={1}
                // @ts-ignore
                customStyles={customStyles}
                subHeader
                subHeaderComponent = {
                  <input
                    type="text"
                    placeholder="Cari laporan..."
                    className="p-2 w-1/4 my-3 border border-gray-300 text-black rounded-lg"
                    value={searchTransaction}
                    onChange={(e) => setSearchTransaction(e.target.value)}
                  />
                }
              />
            </div>

            <Modal isOpen = {!!selectedSupplier} onClose={() => setSelectedSupplier(null)}>
              {selectedSupplier && <SupplierSummaryCard supplierSummary={selectedSupplier} />}
            </Modal>

            <Modal isOpen = {!!selectedInventory} onClose = { () => setSelectedInventory(null)}>
              {selectedInventory && <InventorySummaryCard inventorySummary={selectedInventory}/>}
            </Modal>

            <Modal isOpen = {!!selectedTransaction} onClose = { () => setSelectedTransaction(null)}>
              {selectedTransaction && <TransactionDetailCard id={selectedTransaction}/>}
            </Modal>
        </div>
        </LayoutComponent>
    )
}