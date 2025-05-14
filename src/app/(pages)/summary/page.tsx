"use client"
import LayoutComponent from "@/app/components/layout/layoutComponent"
import { useState, useEffect, use } from "react";
import DataTable from "react-data-table-component"
import { useFetchSupplierSummary } from "../../../../lib/calledAPI/service/serviceApiSupplier"
import { detailSupplierColumns } from "@/app/components/table/detailSupplierTable"
import { detailInventoryColumns } from "@/app/components/table/detailInventoryTable";
import { useFetchInventorySummary } from "../../../../lib/calledAPI/service/serviceApiInventory";
import {toast} from "sonner"
import { SupplierSummary } from "../../../../models/detail_supplier/detail_supplier"
import { customStyles } from "@/app/components/table/customDesignTable"
import { InventorySummary } from "../../../../models/detail_warehouse/detail_warehouse";
import Modal from "@/app/components/modal/modal";
import SupplierSummaryCard from "@/app/components/card/supplier/supplierSummaryCard";
import InventorySummaryCard from "@/app/components/card/inventory/inventorySummaryCard";

export default function Summary() {
  const{data: supplierSummary} = useFetchSupplierSummary();
  const{data: inventorySummary} = useFetchInventorySummary();

  const [selectedSupplier, setSelectedSupplier] = useState<SupplierSummary | null>(null);
  const [selectedInventory, setSelectedInventory] = useState<InventorySummary | null>(null);

  const [search, setSearch] = useState("");
  
  const filteredData = supplierSummary?.filter((item :SupplierSummary) =>
    [item.barcode, item.city, item.name, item.phone_number, item.supplier_name]
      .some((field) => field.toLowerCase().includes(search.toLowerCase()))
  );
  const filteredDataInventory = inventorySummary?.filter((item :InventorySummary) =>
    [item.barcode, item.location, item.name, item.movement_type, item.description]
      .some((field) => field.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDetailSupplier = (supplier:SupplierSummary) => {
    setSelectedSupplier(supplier);
  }

  const handleDetailInventory = (inventory:InventorySummary) => {
    setSelectedInventory(inventory);
  }

    return (
        <LayoutComponent title={""} subTitle={"Home / Summary"}>
          <div className="p-4">
             <header>
                <h1 className="text-black font-bold text-2xl">Laporan</h1>
                <p className="text-gray-500">Laporan untuk memantau data</p>
            </header>

            <h1 className="font-semibold text-lg text-center text-black mt-10 "> List Laporan Supplier</h1>
            <div className="rounded-xl shadow-md overflow-hidden text-black bg-white mt-3 border border-gray-300">
              <DataTable
                columns={detailSupplierColumns(handleDetailSupplier)}
                data={filteredData}
                pagination
                highlightOnHover
                striped
                persistTableHead
                defaultSortFieldId={1}
                customStyles={customStyles}
              />
            </div>

            <h1 className="font-semibold text-lg text-center text-black mt-16 "> List Laporan Penyimpanan</h1>
            <div className="rounded-xl shadow-md overflow-hidden text-black bg-white mt-3 border border-gray-300">
              <DataTable
                columns={detailInventoryColumns(handleDetailInventory)}
                data={filteredDataInventory}
                pagination
                highlightOnHover
                striped
                persistTableHead
                defaultSortFieldId={1}
                customStyles={customStyles}
              />
            </div>
            <Modal isOpen = {!!selectedSupplier} onClose={() => setSelectedSupplier(null)}>
              {selectedSupplier && <SupplierSummaryCard supplierSummary={selectedSupplier} />}
            </Modal>

            <Modal isOpen = {!!selectedInventory} onClose = { () => setSelectedInventory(null)}>
              {selectedInventory && <InventorySummaryCard inventorySummary={selectedInventory}/>}
            </Modal>
        </div>
        </LayoutComponent>
    )
}