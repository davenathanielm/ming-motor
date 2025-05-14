"use client";
import LayoutComponent from "@/app/components/layout/layoutComponent";
import { Product } from "../../../../../models/productModel/productModel";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { formDataProduct } from "@/app/components/items/formTemplate";
import { useFetchCategoryProduct } from "../../../../../lib/calledAPI/service/serviceApiCategory";  
import { useFetchSuplier } from "../../../../../lib/calledAPI/service/serviceApiSupplier";
import { useFetchInventory } from "../../../../../lib/calledAPI/service/serviceApiInventory";
import FormRenderer from "@/app/components/items/formRender"; 
import { injectOptionForm } from "@/app/utils/formUtils";
import { injectMultipleOptionsForm } from "@/app/utils/formUtils";
import { useInsertProduct } from "../../../../../lib/calledAPI/service/serviceApiProduct";
import { toast } from "sonner";

export default function AddProductPage() {
    const [isScanning, setIsScanning] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const {register, handleSubmit, reset, setValue, control, formState: {errors}} = useForm<Product>();
    const {data : categoryData} = useFetchCategoryProduct();
    const {data : supplierData} = useFetchSuplier();
    const {data : inventoryData} = useFetchInventory();
   
    const categories = 
    categoryData?.map((item:any) => ({
        label: item.category_name,
        value: item.id_category,
    })) || [];
    
    const supplier = 
    supplierData?.map((item:any) => ({
        label: item.supplier_name,
        value: item.id_supplier,
    })) || [];
   
    const inventory = 
    inventoryData?.map((item:any) => ({
        label: item.location,
        value: item.id_inventory,
    })) || [];

    console.log("supplier terbaru :", supplier);

    const updatedFormData = useMemo(() => {
    return injectMultipleOptionsForm(formDataProduct, [
        { name: "id_category", options: categories },
        { name: "id_supplier", options: supplier },
        { name: "id_inventory", options: inventory },
        // { name: "id_warehouse", options: warehouses }, // if available
    ]);
    }, [categories, supplier]);


  
    const mutationInsertProduct = useInsertProduct();

    useEffect(() => {
    if (isScanning && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isScanning]);

    const onSubmit = async (data: Product) => {
        console.log("Product added:", data);
        try{
            await mutationInsertProduct.mutateAsync(data);
            reset();
            // Reset form for next scan
            setTimeout(() =>{
                setIsScanning(true); // Reactivate scanning mode
                if(inputRef.current) {
                    inputRef.current.focus(); // Focus on the input again
                }
            },100);
            toast.success(`Product ${data.name} berhasil ditambahkan`)
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error(`Product ${data.name} gagal ditambahkan`)
        }
    };

    return(
    <LayoutComponent>
        <div>
            <h1 className="text-2xl font-bold text-black mb-3">Tambah Produk</h1>
            <div className="bg-white rounded-xl shadow-md p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="text-black">
                    <div className="">
                        {/* because generic value T then it is become product */}
                        <FormRenderer<Product>
                            formData = {updatedFormData}
                            register = {register}
                            control={control}
                            errors = {errors}
                            gridClassname = "grid grid-cols-2 gap-8"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-6 mt-12">
                        <button
                            type="reset"
                            className="bg-red-600 font-bold text-white px-6 py-2 rounded-lg">
                            Batal
                        </button>
                        <button
                            type="submit"
                            className=" bg-green-600 font-bold text-white px-6 py-2  rounded-lg">
                            Kirim
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </LayoutComponent>
);  
}

// information
//  1. injection use to inject the options from form Template
// 2. useMemo will be running if categories change

  // const updatedFormData = useMemo(() => 
    //         injectOptionForm(formDataProduct, "id_category", categories),
    //     [categories]
    // ); 