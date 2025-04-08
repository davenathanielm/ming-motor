"use client";
import LayoutComponent from "@/app/components/layout/layoutComponent";
import DataTable, { TableColumn } from "react-data-table-component";
import { useState, useEffect, use } from "react";
import { useFetchProducts} from "../../../../lib/calledAPI/service/serviceApiProduct";
import { Productcolumns,handleUpdateProduct } from "@/app/components/table/productTable";
import { customStyles } from "@/app/components/table/customDesignTable";
import Link from "next/link";

export default function ProductPage() {
  const [search, setSearch] = useState("");
  const {data} = useFetchProducts();
  const products = data?.data || [];
  console.log("data fetched now : ", data);
  // Filter data based on search input
  const filteredData = products.filter((item :any) =>
    [item.name, item.brand, item.barcode]
      .some((field) => field.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <LayoutComponent>
      <div className="flex justify-between mb-3 px-2">
          <h1 className="text-2xl font-bold text-black">Product List</h1>
          <Link href={"/product/addProduct"} >
              <button className="px-3 bg-blue-300 text-blue-950 font-bold rounded-full py-2 hover:cursor-pointer">+ Tambah barang</button>
          </Link>
      </div>
      {/* <button
        onClick={addProduct}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Add New Product
      </button> */}

      <div className="rounded-xl shadow-md overflow-hidden text-black bg-white">
        <DataTable
          columns={Productcolumns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          persistTableHead
          defaultSortFieldId={1}
          // subHeader
          customStyles={customStyles}
          // subHeaderComponent={
          //   <input
          //     type="text"
          //     placeholder="Search product..."
          //     value={search}
          //     onChange={(e) => setSearch(e.target.value)}
          //     className="p-2 border rounded-3xl"
          //   />
          // }
        />
      </div>
    </LayoutComponent>
  );
}






