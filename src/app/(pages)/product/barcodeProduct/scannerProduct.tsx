"use client";
import { useForm } from "react-hook-form";
import { Barcode } from "../../../../../models/productModel/productModel";
import { toast } from "sonner";
import { barcodeImage } from "@/app/components/items/image";
import { useSearchBarcodeProduct } from "../../../../../lib/calledAPI/service/serviceApiProduct";
import Image from "next/image";
import Button from "@/app/components/items/button";
import { useSession } from "next-auth/react";

export default function ScannerProductPage({onResult}: { onResult: (result:any) => void}) {
    const {register, handleSubmit, reset, setValue, control, formState: {errors}} = useForm<Barcode>();
    const {data : session} = useSession();
    const mutationInsertBarcode = useSearchBarcodeProduct(session?.user?.role);


    const onSubmit = async (barcode : Barcode)=>{
        // console.log("barcode yang masuk : ", barcode);
        try {
            const response = await mutationInsertBarcode.mutateAsync(barcode);
            // console.log("response barcode : ", response);
            onResult({
                status: response.status,
                data: response.data, 
                barcode: barcode.barcode
                // Call the onResult function with the response data
            })
            
        } catch (error) {
            toast.error("Terjadi kesalahan silahkan coba lagi");
        }
    }
    return(
        <div className="">
            <div className="w-full border-b-1"></div>
            <div className="flex justify-center items-center my-10">
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
                    <div className="flex justify-center items-center gap-4 mt-4 mb-14 mx-64">
                        <input 
                            type="text" 
                            placeholder="Scan barcode atau ketik disini" 
                            className="w-full p-5 rounded-lg bg-white border-2 border-gray-300 shadow-sm text-sm"
                            {...register("barcode", {required: true})}
                            autoFocus
                        />
                        {/* <button className="bg-blue-600 font-bold text-white px-6 py-2 text-sm rounded-lg">generate</button> */}
                    </div>
                    <div className="flex justify-center gap-6 ">
                        <Button title="Batal" onClick={reset} variant="delete"/>
                        <Button title="Simpan" type="submit" variant="submit"/>
                    </div>
                </form>
            </div>
        </div>
    );
};