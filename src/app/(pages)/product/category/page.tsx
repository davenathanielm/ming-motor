"use client";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { categoryColumns } from "@/app/components/table/categoryTable";
import { customStyles } from "@/app/components/table/customDesignTable";
import Link from "next/link";
import { useFetchCategoryProduct } from "../../../../../lib/calledAPI/service/serviceApiCategory";
import LayoutComponent from "@/app/components/layout/layoutComponent";
import { Category, updateCategory } from "../../../../../models/categoryModel/categoryModel";
import AddCategoryPage from "@/app/components/card/category/addCategoryCard";
import { useDeleteCategory } from "../../../../../lib/calledAPI/service/serviceApiCategory";
import Modal from "@/app/components/modal/modal";
import UpdateCategoryPage from "@/app/components/card/category/updateCategory";



export default function CategoryPage(){
    const {data : inventoryData} = useFetchCategoryProduct();
    const [selectedProduct, setSelectedProduct] = useState<Category | null>(null);
    const [addedCategory, setAddedCategory] = useState<boolean | null>(false);
    const [updateCategory, setUpdateCategory] = useState<Category | null>(null);
    const [search, setSearch] = useState("");
    const {mutate : deletedCategory} = useDeleteCategory();
    const inventories = inventoryData || [];

    const filteredData = inventories.filter((item :Category) =>
    [item.category_name, item.description]
        .some((field) => field.toLowerCase().includes(search.toLowerCase()))
    );

    const handleUpdate = (category : Category) => {
        setUpdateCategory(category)
    };
    const handleDelete = (id: string , name : string) => {
        // try {
        //       deleteProductById(id);
        //       toast.success(`Product ${name} berhasil dihapus`);
        // }catch(error) {
        //     toast.error(`Product ${name} gagal dihapus`);
        // }
    };
    const handleDetail = (category:Category) => {
        // setSelectedProduct(product);
    };
    
    const handleAddCategory = () => {
        setAddedCategory(true);
    }

    return (
        <LayoutComponent>
            <div className="py-6">
                <div className="flex  mb-3 px-2">
                    <h1 className="text-2xl font-bold text-black">Daftar Kategori Produk</h1>
                    {/* <Link href={"/product/addProduct"} >
                        <button className="px-3 bg-blue-300 text-blue-950 font-bold rounded-lg py-2 hover:cursor-pointer">+ Tambah barang</button>
                    </Link> */}
                    <div className="flex justify-end ml-auto gap-4">   
                        <button className="px-3 bg-blue-300 text-blue-950 font-bold rounded-lg py-2 hover:cursor-pointer" onClick={handleAddCategory}>+ Tambah Kategori</button>
                    </div>
                </div>

                <div className="rounded-xl shadow-md overflow-hidden text-black bg-white">
                <DataTable
                    columns={categoryColumns(handleUpdate,handleDelete,handleDetail)}
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
                <Modal isOpen={!!addedCategory} onClose={() => setAddedCategory(null)}>
                {addedCategory && <AddCategoryPage/>}
                </Modal>


                <Modal isOpen={!!updateCategory} onClose={() => setUpdateCategory(null)}>
                {updateCategory && <UpdateCategoryPage category = {updateCategory} onClose = {() => setUpdateCategory(null)}/>}
                </Modal>
            </div>
        </LayoutComponent>
    );
}