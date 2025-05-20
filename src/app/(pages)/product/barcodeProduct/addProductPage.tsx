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
import Button from "@/app/components/items/button";

export default function AddProductPageBarcode({defaultBarcode, onBack, role}: {defaultBarcode : string; onBack : () => void; role : string;}){
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
    
        const updatedFormData = useMemo(() => {
            const formWithOptions = injectMultipleOptionsForm(formDataProduct, [
                { name: "id_category", options: categories },
                { name: "id_supplier", options: supplier },
                { name: "id_inventory", options: inventory },
            ]);

        // Mark barcode field as readOnly if defaultBarcode exists
            return formWithOptions.map(field => {
                if (field.name === "barcode" && defaultBarcode) {
                    return { ...field, readOnly: true };
                }
                if (field.name === "hpp" && role !== "owner") {
                    return { ...field, readOnly: true };
                }
                return field;
            });
        }, [categories, supplier, inventory, defaultBarcode]);
        
      
        const mutationInsertProduct = useInsertProduct();

        useEffect(() => {
            if (defaultBarcode) {
                setValue("barcode", defaultBarcode); // Set the default barcode
            }
        }, [defaultBarcode, setValue]);
    
        useEffect(() => {
        if (isScanning && inputRef.current) {
          inputRef.current.focus();
        }
      }, [isScanning]);
    
        const onSubmit = async (data: Product) => {
            console.log("Product yang dimasukin:", data);
            try{
                await mutationInsertProduct.mutateAsync(data);
                toast.success(`Product ${data.name} berhasil ditambahkan`)
                setTimeout(() =>{
                    onBack();
                },2000);
            } catch (error) {
                console.error("Error adding product:", error);
                toast.error(`Product ${data.name} gagal ditambahkan`)
            }
        };
    
        return(
            <div>
                <header className="mb-3">
                    <h1 className="text-black font-bold text-2xl">Tambah Data Produk</h1>
                    <p className="text-gray-500">Silahkan mengisi form data produk untuk menambah data</p>
                </header>
                {/* Button */}
                <div className="flex justify-end">
                    <Button title="perbarui status" href="/product/barcodeProduct" />
                </div>
                <div className="bg-white/85 rounded-xl shadow-md p-8 mt-3">
                    <form onSubmit={handleSubmit(onSubmit)} className="text-black">
                        <div className="">
                            {/* because generic value T then it is become product */}
                            <FormRenderer<Product>
                            // @ts-ignore
                                formData = {updatedFormData}
                                register = {register}
                                control={control}
                                errors = {errors}
                                gridClassname = "grid grid-cols-2 gap-8"
                            />
                        </div>
                        <span className="">
                            {/* <button
                                type="button"
                                onClick={onBack}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-6"
                            >
                                Kembali
                            </button> */}
                            {/* Submit Button */}
                            <div className="flex justify-end gap-6 mt-12">
                                <Button title="Batal" onClick={reset} variant="delete"/>

                                {/* <button
                                    type="submit"
                                    className=" bg-green-600 font-bold text-white px-6 py-2  rounded-lg">
                                    Kirim
                                </button> */}
                                <Button title="Simpan" type="submit" variant="submit"/>
                            </div>
                        </span>
                    </form>
                </div>
            </div>
        );
}