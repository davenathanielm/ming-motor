"use client";
import LayoutComponent from "@/app/components/layout/layoutComponent";
import { Product } from "../../../../../models/productModel/productModel";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { formDataProduct } from "@/app/components/items/formTemplate";
import { useFetchCategoryProduct } from "../../../../../lib/calledAPI/service/serviceApiProduct";  
import FormRenderer from "@/app/components/items/formRender"; 

export default function AddProductPage() {
    const {register, handleSubmit, reset, setValue, formState: {errors}} = useForm<Product>();
    const [isScanning, setIsScanning] = useState(true);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const {data} = useFetchCategoryProduct();
    const categories = data?.data.map((item:any) => item.category_name) || [];
    console.log("categories : ", categories);

    useEffect(() => {
    if (isScanning && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isScanning]);

    const onSubmit = async (data: Product) => {
    console.log("Product added:", data);

    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Reset form for next scan
    reset();
    setTimeout(() =>{
        setIsScanning(true); // Reactivate scanning mode
        if(inputRef.current) {
            inputRef.current.focus(); // Focus on the input again
        }
    },100);
  };

    return(
    <LayoutComponent>
        <div>
            <h1 className="text-2xl font-bold text-black mb-3">Tambah Produk</h1>
            <div className="bg-white rounded-xl shadow-md p-4">
                <form onSubmit={handleSubmit(onSubmit)} className="text-black">
                    <div className="">
                        {/* because generic value T then it is become product */}
                        <FormRenderer<Product>
                            formData = {formDataProduct}
                            register = {register}
                            errors = {errors}
                            gridClassname = "grid grid-cols-2 gap-12 m-15"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className=" w-full bg-blue-500 text-white py-2 rounded-md"
                        >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    </LayoutComponent>
);  

}