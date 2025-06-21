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
import { useProductAlert } from "@/app/utils/alertUtils";
import { toast } from "sonner";
import Button from "@/app/components/items/button";
import { useSession } from "next-auth/react";

export default function ProductPage() {

   useProductAlert();

  const {data: session} = useSession();
  //  @ts-ignore
  const {data} = useFetchProducts(session?.user.role);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const products = data?.data || [];
  const router = useRouter();
  const { mutate: deleteProductById } = useDeleteProduct();

  

  // Filter data based on search input
  const filteredData = products.filter((item :any) =>
    [item.name || "", item.brand || "", item.barcode || ""]
      .some((field) => field.toLowerCase().includes(search.toLowerCase()))
  );
 
console.log("filteredData Produk :", filteredData);
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
        <div className="flex flex-col mb-3 px-2">
          <header>
              <h1 className="text-black font-bold text-2xl">Daftar Produk</h1>
              <p className="text-gray-500">List produk dalam toko</p>
          </header>
           
           {/* button */}
            <div className="flex justify-end items-center ml-auto gap-4">   
              <Button title="+ Tambah Barang" href="/product/barcodeProduct" />
            </div>
        </div>

        {/* <div className="flex justify-end items-center mb-2">
          
          <div className="flex gap-4">   
            <Button title="+ Tambah Barang" href="/product/barcodeProduct" />
          </div>

          <input
            type="text"
            placeholder="Cari produk..."
            className="border border-gray-300 rounded-lg px-3 py-2 w-1/4"
            value={search ?? ""}
            onChange={(e) => setSearch(e.target.value)}
          />
           
        </div> */}

        <div className="rounded-xl shadow-md overflow-hidden text-black bg-white">
          <DataTable
          // @ts-ignore
            columns={Productcolumns(handleUpdate,handleDelete,handleDetail , session?.user.role)}
            data={filteredData}
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
                placeholder="Cari produk..."
                className="p-2 w-1/4 my-3 border border-gray-300 text-black rounded-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
          />
        </div>

        {/* check if selectedProduct = null (falsy) return isOpen false or selectedProduct = Product (thruthy) return isOpen true */}
        <Modal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)}>
          {/* @ts-ignore */}
          {selectedProduct && <ProductDetailCard product={selectedProduct} role = {session?.user?.role} />}
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




