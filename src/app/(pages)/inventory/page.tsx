"use client";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { inventoryColumns } from "@/app/components/table/inventoryTable";
import { customStyles } from "@/app/components/table/customDesignTable";
import Link from "next/link";
import { useFetchInventory } from "../../../../lib/calledAPI/service/serviceApiInventory";
import LayoutComponent from "@/app/components/layout/layoutComponent";
import { Inventory } from "../../../../models/inventoryModel/inventoryModel";
import AddInventoryPage from "@/app/components/card/inventory/addInventoryCard";
import AddSupplierPage from "@/app/components/card/supplier/addSupplierCard";
import UpdateInventoryPage from "@/app/components/card/inventory/updateInventoryCard";
import { useDeleteInventory } from "../../../../lib/calledAPI/service/serviceApiInventory";
import { toast } from "sonner";
import Modal from "@/app/components/modal/modal";
import Button from "@/app/components/items/button";

export default function InventoryPage(){
   const {data : inventoryData} = useFetchInventory();
    const [selectedInventory, setSelectedInventory] = useState<Inventory | null>(null);
    const [addedInventory, setAddedInventory] = useState<boolean | null>(false);
    const [updatedInventory, setUpdatedInventory] = useState<Inventory | null>(null);
    const [search, setSearch] = useState("");
    const inventories = inventoryData || [];
    const {mutate: deleteInventoryById} = useDeleteInventory();
    const filteredData = inventories.filter((item :Inventory) =>
    [item.location, item.description]
        .some((field) => field.toLowerCase().includes(search.toLowerCase()))
    );

    const handleUpdate = (inventory: Inventory) => {
       setUpdatedInventory(inventory);
    };
    const handleDelete = (id: string , name : string) => {
        try {
              deleteInventoryById(id);
              toast.success(`Inventory ${name} berhasil dihapus`);
        }catch(error) {
            toast.error(`Inventory ${name} gagal dihapus`);
        }
    };

    const handleAddInventory = () => {
        setAddedInventory(true);
    }

    return (
        <LayoutComponent subTitle="Home / Product / Inventory">
            <div className="px-14 py-10">
                <div className="flex flex-col px-2">
                <header>
                    <h1 className="text-black font-bold text-2xl">Pengaturan Gudang</h1>
                    <p className="text-gray-500">Preferensi Gudang dan Pengaturan</p>
                </header>
                    <div className="flex justify-end ml-auto gap-4">   
                        <Button title={"+ Tambah Gudang"} onClick={handleAddInventory}/>
                    </div>
                </div>

                <div className="rounded-xl shadow-md overflow-hidden text-black bg-white mt-3">
                    <DataTable
                        columns={inventoryColumns(handleUpdate,handleDelete)}
                        data={filteredData}
                        pagination
                        highlightOnHover
                        striped
                        persistTableHead
                        defaultSortFieldId={1}
                        customStyles={customStyles}
                    />
                </div>

                {/* check if selectedInventory = null (falsy) return isOpen false or selectedInventory = Product (thruthy) return isOpen true */}
                <Modal isOpen={!!addedInventory} onClose={() => setAddedInventory(null)}>
                {addedInventory && <AddInventoryPage/>}
                </Modal>


                <Modal isOpen={!!updatedInventory} onClose={() => setUpdatedInventory(null)}>
                {updatedInventory && <UpdateInventoryPage inventory = {updatedInventory} onClose = {() => setUpdatedInventory(null)} />}
                </Modal>
            </div>
        </LayoutComponent>
    );
}