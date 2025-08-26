"use client";
import { useState } from "react";
import LayoutComponent from "@/app/components/layout/layoutComponent";
import DataTable from "react-data-table-component";
import { supplierColumns } from "@/app/components/table/supplierTable";
import { customStyles } from "@/app/components/table/customDesignTable";
import Link from "next/link";
import { useFetchSuplier } from "../../../../lib/calledAPI/service/serviceApiSupplier";
import { Supplier } from "../../../../models/supplierModel/supplierModel";
import { useDeleteSupplier } from "../../../../lib/calledAPI/service/serviceApiSupplier";
import Modal from "@/app/components/modal/modal";
import SupplierDetailCard from "@/app/components/card/supplier/supplierDetailCard";``
import AddSupplierPage from "@/app/components/card/supplier/addSupplierCard";
import UpdateSupplierPage from "@/app/components/card/supplier/updateSupplierCard";
import { toast } from "sonner";
import Button from "@/app/components/items/button";

export default function SupplierPage(){
    const {data : supplierData} = useFetchSuplier();
    const [search, setSearch] = useState("");
    const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
    const [addSupplier, setAddSupplier] = useState<boolean | null>(false );
    const [updateSupplier, setUpdateSupplier] = useState<Supplier | null>(null);

    const suppliers = supplierData || [];
    const {mutate: deleteSupplier} = useDeleteSupplier();

    const filteredData = suppliers.filter((item :Supplier) =>
    [item.supplier_name, item.phone_number, item.city]
      .some((field) => field?.toLowerCase().includes(search.toLowerCase()))
  );

    const handleUpdate = (supplier: Supplier) => {
        setUpdateSupplier(supplier);
    };
    const handleDelete = (id: string , name : string) => {
        try {
              deleteSupplier(id);
              toast.success(`Product ${name} berhasil dihapus`);
        }catch(error) {
            toast.error(`Product ${name} gagal dihapus`);
        }
    };
    const handleDetail = (supplier:any) => {
        setSelectedSupplier(supplier);
    };
    const handleAddSupplier = ()=> {  
        setAddSupplier(true);
    }
    return (
        <LayoutComponent subTitle="Home / Product / Supplier">
            <div className="px-14 py-10">
                <div className="flex flex-col  px-2">
                    <header className=" mb-4">
                        <h1 className="text-black font-bold text-2xl"> Daftar Supplier</h1>
                        <p className="text-gray-500">Preferensi Supplier dan Pengaturan</p>
                    </header>

                   {/* Button */}
                    <div className="flex justify-end ml-auto gap-4 ">   
                        {/* <button className="px-3 bg-customBackgroundButton text-white/90 font-bold rounded-lg py-2 hover:cursor-pointer" onClick={handleAddSupplier}>+ Tambah Supplier</button> */}
                        <Button title = "+ Tambah Supplier" onClick={handleAddSupplier}/>
                    </div>
                </div>

                <div className="rounded-xl shadow-md overflow-hidden text-black bg-white mt-3">
                <DataTable
                    columns={supplierColumns(handleUpdate,handleDelete,handleDetail)}
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
                            placeholder="Cari supplier..."
                            className="p-2 w-1/4 my-3 border border-gray-300 text-black rounded-lg"
                            value={search ?? ""}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    }
                />
                </div>

                {/* check if selectedProduct = null (falsy) return isOpen false or selectedProduct = Product (thruthy) return isOpen true */}
                <Modal isOpen={!!selectedSupplier} onClose={() => setSelectedSupplier(null)}>
                {selectedSupplier && <SupplierDetailCard supplier={selectedSupplier} />}
                </Modal>
                
                {/* check if modal addsupplier falsy or not  */}
                <Modal isOpen={!!addSupplier} onClose={() => setAddSupplier(null)}>
                {addSupplier && <AddSupplierPage/>}
                 </Modal>

                {/* check if modal updateSupplier falsy or not if falsy or it means null then it will return null */}
                <Modal isOpen={!!updateSupplier} onClose={() => setUpdateSupplier(null)}>
                {updateSupplier && <UpdateSupplierPage supplier = {updateSupplier} onClose={() => setUpdateSupplier(null)} />}
                 </Modal>
            </div>
        </LayoutComponent>
    );
}