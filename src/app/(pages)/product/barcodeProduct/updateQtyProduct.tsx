"use client";
import { Product } from "../../../../../models/productModel/productModel";
import {useForm } from "react-hook-form";
import { formDataUpdateProduct } from "@/app/components/items/formTemplate";
import FormRenderer from "@/app/components/items/formRender";
import { injectMultipleOptionsForm } from "@/app/utils/formUtils";
import { useFetchSuplier } from "../../../../../lib/calledAPI/service/serviceApiSupplier";
import { useFetchInventory } from "../../../../../lib/calledAPI/service/serviceApiInventory";
import { useRef , useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useUpdateQtyProduct } from "../../../../../lib/calledAPI/service/serviceApiProduct";
import { formatDate } from "@/app/components/items/date";
import { currencyFormat } from "@/app/components/items/date";
import { useSession } from "next-auth/react";
import { displayPrice } from "@/app/utils/roleFilter";

export default function UpdateQtyProductPage({product, onBack} : {product : Product; onBack : () => void}){
const {register, handleSubmit, reset, setValue, control, formState: {errors}} = useForm<Product>();    
    const{barcode , name, selling_price,hpp,qty ,description,id_product} = product
    const {data : supplierData} = useFetchSuplier();
    const {data : inventoryData} = useFetchInventory();
    const {data : session} = useSession();
    const mutationUpdateQtyProduct = useUpdateQtyProduct(id_product);
    const profit = selling_price - hpp;

   
    const dateCreated = formatDate(product.created_at.toString());
    const dateUpdated = formatDate(product.updated_at.toString());

    const formRef = useRef<HTMLFormElement>(null);

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

        const updatedFormData = useMemo(() => 
            injectMultipleOptionsForm(formDataUpdateProduct, [
                { name: "id_supplier", options: supplier },
                { name: "id_inventory", options: inventory },
            ]),[supplier, inventory]);

    const onSubmit = async (data: Product)=>{
        console.log("data yang masuk : ", data);
        const finalData = {
            ...data,
            hpp: product.hpp, // Inject hpp
            id_product: product.id_product, // Just to be safe
        };

        try{    
             await mutationUpdateQtyProduct.mutateAsync(finalData);
             toast.success(`Stok product ${name} berhasil ditambahkan`)
                setTimeout(() =>{
                    onBack();
                },2000);
        }catch(error){
            toast.error(`Product ${data.name} gagal ditambahkan`)
            reset();
        }
    }
    
    return(
        <div className="p-5">
            <header>
                <h1 className="text-black font-bold text-xl">Update Qty Product</h1>
                <p className="text-gray-500 text-base">Preferensi Akun dan Pengaturan</p>
            </header>
            {/* Image Placeholder */}
            {/* <div className="p-3 rounded-xl  w-fit h-fit">
                <div className="bg-gray-200  rounded-xl shadow-md" />
            </div> */}

                <div className="flex flex-col lg:flex-row flex-wrap gap-6 mt-6">
                {/* Product Info */}
                    <div className="flex flex-col gap-4 flex-1 w-full text-black">
                        {/* Info */}    
                        <div className="border bg-white shadow-md rounded-xl p-4 ">
                            <h2 className="font-semibold mb-2 text-lg">Informasi Produk</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6 text-sm">
                                    <div>
                                        <p className="text-gray-700">Produk :</p>
                                        <span className="text-black font-semibold">{name}</span>
                                    </div>
                                    <div>
                                        <p className="text-gray-700">Barcode :</p>
                                        <span className="text-black font-semibold">{barcode}</span>
                                    </div>
                                    <div>
                                        <p className="text-gray-700">Harga Beli</p>
                                        {/* @ts-ignore */}
                                        <p className="font-semibold">{displayPrice(session?.user?.role , hpp)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700">Harga Jual</p>
                                        <p className="font-semibold">{currencyFormat(selling_price)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700">Keuntungan</p>
                                        {/* @ts-ignore */}
                                        <p className="font-semibold text-green-700">{displayPrice(session?.user?.role , profit)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-700">Stok</p>
                                        <p className="font-semibold">{qty} pcs</p>
                                    </div>
                                </div>
                        </div>

                        {/* Description */}
                        <div className="border bg-white shadow-md rounded-xl p-4 ">
                            <h2 className="font-semibold mb-1">Deskripsi</h2>
                            <p className="text-sm text-gray-700 w-full h-16">{description}</p>
                        </div>
                    </div>

                {/* Right Sidebar (form section) */}
                <div className="flex flex-col gap-4 w-full lg:w-80 text-black">
                    {/* Tanggal Info */}
                    <div className="border bg-white shadow-md rounded-xl p-4 ">
                        <p className="font-semibold">Informasi Tambahan</p>
                        <div className="grid grid-cols-1 gap-2 text-sm mt-2">
                            <p className="text-gray-700">
                            Tanggal Dibuat : <span className="text-black font-semibold">{dateCreated}</span>
                            </p>
                            <p className="text-gray-700">
                            Tanggal Diperbarui : <span className="text-black font-semibold">{dateUpdated}</span>
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bord`er bg-white shadow-md rounded-xl p-4 ">
                    <p className="font-semibold mb-2">Form input</p>
                    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex justify-center items-center gap-2 my-4">
                        <FormRenderer<Product>
                            // @ts-ignore
                            formData={updatedFormData}
                            register={register}
                            control={control}
                            errors={errors}
                            gridClassname="grid grid-cols-1 md:grid-cols-2 gap-8"
                        />
                        </div>
                    </form>
                    </div>
                    <div className="flex justify-end gap-6 mt-12">
                        <button
                            type="reset"
                            onClick={onBack}
                            className="bg-red-600 font-bold text-white px-6 py-2 rounded-lg">
                            Batal
                        </button>
                        <button
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                            className=" bg-green-600 font-bold text-white px-6 py-2  rounded-lg">
                            Kirim
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    function ProductInfo(title : string , subTitle : string , value:any) {
        return(
            <div className="flex flex-col gap-4 flex-1 w-full text-black">
            {/* Info */}
            <div className="border border-gray-300 rounded-xl p-4">
            <h2 className="font-semibold mb-2">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-6 text-sm">
                <div>
                    <p className="text-gray-700">{subTitle} :</p>
                    <span className="text-black font-semibold">{value}</span>
                </div>
                <div>
                    <p className="text-gray-700">Barcode :</p>
                    <span className="text-black font-semibold">{barcode}</span>
                </div>
                <div>
                    <p className="text-gray-700">Harga Beli</p>
                    <p className="font-semibold">{currencyFormat(hpp)}</p>
                </div>
                <div>
                    <p className="text-gray-700">Harga Jual</p>
                    <p className="font-semibold">{currencyFormat(selling_price)}</p>
                </div>
                <div>
                    <p className="text-gray-700">Keuntungan</p>
                    <p className="font-semibold text-green-600">{currencyFormat(profit)}</p>
                </div>
                <div>
                    <p className="text-gray-700">Stok</p>
                    <p className="font-semibold">{qty} pcs</p>
                </div>
            </div>
            </div>

            {/* Description */}
            <div className="border border-gray-300 rounded-xl p-4">
                <h2 className="font-semibold mb-1">Deskripsi</h2>
                <p className="text-sm text-gray-700 w-full h-18">{description}</p>
            </div>
        </div>
        )
    }
}