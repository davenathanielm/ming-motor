"use client";
import { useForm } from "react-hook-form";
import { Barcode } from "../../../../../models/productModel/productModel";
import { toast } from "sonner";
import { barcodeImage } from "@/app/components/items/image";
import { useSearchBarcodeProduct } from "../../../../../lib/calledAPI/service/serviceApiProduct";
import Image from "next/image";

export default function ScannerProductPage({onResult}: { onResult: (result:any) => void}) {
    const {register, handleSubmit, reset, setValue, control, formState: {errors}} = useForm<Barcode>();
    const mutationInsertBarcode = useSearchBarcodeProduct();


    const onSubmit = async (barcode : Barcode)=>{
        console.log("barcode yang masuk : ", barcode);
        try {
            const response = await mutationInsertBarcode.mutateAsync(barcode);
            console.log("response barcode : ", response);
            onResult({
                status: response.status,
                data: response.data, 
                barcode: barcode.barcode
                // Call the onResult function with the response data
            })
            
        } catch (error) {
            console.error("Error inserting product:", error);
            toast.error("Terjadi kesalahan silahkan coba lagi");
        }
    }
    return(
        <div className="">
            <div className="bg-white rounded-xl border-2">
                <h1 className="text-2xl font-bold p-6 text-black">Tambah Stok Produk Baru </h1>
                <div className="w-full border-b-1"></div>
                <div className="flex justify-center items-center mt-10 ">
                    <Image 
                        src={barcodeImage.barcode1}
                        alt=""
                        className="w-36 h-32"
                    />
                </div>
                <div className="text-black text-center">
                    <h1 className="font-bold text-lg"> Masukkan Barcode Produk</h1>
                    <p className="mt-1 mb-6 text-black/60"> scan atau ketik barcode produk untuk lanjut</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex justify-center items-center gap-4 mt-4 mb-20 mx-64">
                            <input 
                                type="text" 
                                placeholder="Scan barcode atau ketik disini" 
                                className="w-full p-5 rounded-lg bg-white border-2 border-gray-300 shadow-sm text-sm"
                                {...register("barcode", {required: true})}
                                autoFocus
                            />
                            {/* <button className="bg-blue-600 font-bold text-white px-6 py-2 text-sm rounded-lg">generate</button> */}
                        </div>
                        <div className="flex justify-center gap-6  ">
                            <button type="reset" className="bg-red-500 font-bold text-white px-12 py-3 text-sm rounded-lg mb-8 hover:cursor-pointer">Batal</button>
                            <button type="submit" className="bg-green-500 font-bold text-white px-12 py-3 text-sm rounded-lg mb-8 hover:cursor-pointer">Lanjut</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};