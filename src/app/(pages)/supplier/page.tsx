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
      .some((field) => field.toLowerCase().includes(search.toLowerCase()))
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
        <LayoutComponent>
            <div className="py-6">
                <div className="flex  mb-3 px-2">
                    <h1 className="text-2xl font-bold text-black">Daftar Supplier</h1>
                    {/* <Link href={"/product/addProduct"} >
                        <button className="px-3 bg-blue-300 text-blue-950 font-bold rounded-lg py-2 hover:cursor-pointer">+ Tambah barang</button>
                    </Link> */}
                    <div className="flex justify-end ml-auto gap-4">   
                        <button className="px-3 bg-blue-300 text-blue-950 font-bold rounded-lg py-2 hover:cursor-pointer" onClick={handleAddSupplier}>+ Tambah Supplier</button>
                    </div>
                </div>

                <div className="rounded-xl shadow-md overflow-hidden text-black bg-white">
                <DataTable
                    columns={supplierColumns(handleUpdate,handleDelete,handleDetail)}
                    data={filteredData}
                    pagination
                    highlightOnHover
                    striped
                    persistTableHead
                    defaultSortFieldId={1}
                    customStyles={customStyles}
                />
                </div>

                {/* check if selectedProduct = null (falsy) return isOpen false or selectedProduct = Product (thruthy) return isOpen true */}
                <Modal isOpen={!!selectedSupplier} onClose={() => setSelectedSupplier(null)}>
                {selectedSupplier && <SupplierDetailCard supplier={selectedSupplier} />}
                </Modal>
                
                {/* check if modal addsupplier falsy or not  */}
                <Modal isOpen={!!addSupplier} onClose={() => setAddSupplier(null)}>
                {addSupplier && <AddSupplierPage />}
                 </Modal>

                {/* check if modal updateSupplier falsy or not if falsy or it means null then it will return null */}
                <Modal isOpen={!!updateSupplier} onClose={() => setUpdateSupplier(null)}>
                {updateSupplier && <UpdateSupplierPage supplier = {updateSupplier} onClose={() => setUpdateSupplier(null)} />}
                 </Modal>


            </div>
        </LayoutComponent>
    );
}