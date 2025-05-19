"use client";
import LayoutComponent from "@/app/components/layout/layoutComponent";
import DataTable, { TableColumn } from "react-data-table-component";
import { useState, useEffect, use } from "react";
import { useFetchProducts} from "../../../../../lib/calledAPI/service/serviceApiProduct";
import { Productcolumns } from "@/app/components/table/productTable";
import { customStyles } from "@/app/components/table/customDesignTable";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDeleteProduct } from "../../../../../lib/calledAPI/service/serviceApiProduct";
import Modal from "@/app/components/modal/modal";
import ProductDetailCard from "@/app/components/card/product/productDetailCard";
import { Product } from "../../../../../models/productModel/productModel";
import { set } from "react-hook-form";
import { useProductAlert } from "@/app/utils/alertUtils";
import { toast } from "sonner";
import Button from "@/app/components/items/button";

export default function ProductPage() {

   useProductAlert();

  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const {data} = useFetchProducts();
  const products = data?.data || [];
  const router = useRouter();
  const { mutate: deleteProductById } = useDeleteProduct();


  // Filter data based on search input
  const filteredData = products.filter((item :any) =>
    [item.name, item.brand, item.barcode]
      .some((field) => field.toLowerCase().includes(search.toLowerCase()))
  );

  const handleUpdate = (id: string) => {
    router.push(`/product/updateProduct/${id}`);
  };
  const handleDelete =  (id: string , name : string) => {
    try {
          deleteProductById(id);
          toast.success(`Product ${name} berhasil dihapus`);
        
    }catch(error) {
        toast.error(`Product ${name} gagal dihapus`);
    }
  };
  const handleDetail = (product:Product) => {
    setSelectedProduct(product);
  }

  return (
    <LayoutComponent subTitle={"Product / Product List"}>
      <div className="px-14 py-10">
        <div className="flex flex-col  mb-3 px-2">
          <header>
              <h1 className="text-black font-bold text-2xl">Daftar Produk</h1>
              <p className="text-gray-500">List produk dalam toko</p>
          </header>
           
           {/* button */}
            <div className="flex justify-end ml-auto gap-4">   
              <Button title="+ Tambah Barang" href="/product/barcodeProduct" />
            </div>
        </div>

        <div className="rounded-xl shadow-md overflow-hidden text-black bg-white">
          <DataTable
            columns={Productcolumns(handleUpdate,handleDelete,handleDetail)}
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
        <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
          {selectedProduct && <ProductDetailCard product={selectedProduct} />}
        </Modal>
      </div>
    </LayoutComponent>
  );
}


// information
// 1. in here we use router and prepare router to be used in productTable also create function handleUpdate that contain routes and send to productTable
// 2. we sent handleUpdate to productTable and will be called in productTable and in productTable id_product will be passed to handleUpdate function
//  and will be used in router.push from ProductPage to go to the updateProduct page with id_product as a parameter

// Modal 
// 1. const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
// - selectedProduct is a state variable that will hold the product that is selected for detail view.
// - useState<Product | null>(null); it means selectedProduct can be of type Product or null. as a default, it set to null, indicating that no product is selected yet.
// - <> means type data tht wull fill selectedProduct

// 2. <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
//         {selectedProduct && <ProductDetailCard product={selectedProduct} />}
//       </Modal>
// - Thruty and falsy it means js helped to check if selectedProduct is null or not , it is already build in system in js so we dont need to adjust it
// - In this case we want to check if selectedProduct is have null value or product value that's why we use falsy to check ( falsy list : 0, "", null, undefined, NaN, false )
// - {selectedProduct && <ProductDetailCard product={selectedProduct} />} this is a conditional rendering with thruty check using && operator.
// - If selectedProduct is not null (truthy), it will render the ProductDetailCard component and pass the selectedProduct as a prop to it.Otherwise if selectedProduct is null, it will not render anything.

// HOW THESE MODAL WORKS
// 1. first user click button onDetail in productTable                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        




