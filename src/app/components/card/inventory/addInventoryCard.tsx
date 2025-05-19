import { Inventory } from "../../../../../models/inventoryModel/inventoryModel";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useInsertInventory } from "../../../../../lib/calledAPI/service/serviceApiInventory";
import { formDataInventory } from "../../items/formTemplate";
import FormRenderer from "../../items/formRender";
import { toast } from "sonner";
import Button from "../../items/button";

export default function AddInventoryPage(){
    
    const {register, handleSubmit, reset, setValue, control, formState: {errors}} = useForm<Inventory>();
    const mutationInsertInventory = useInsertInventory();

    const onSubmit = async(data: Inventory) => {
        try{
            await mutationInsertInventory.mutateAsync(data);
            toast.success("Inventory berhasil ditambahkan");
            reset();
        }
        catch(error){
            toast.error("inventory gagal ditambahkan");
        }
    }

    return(
        <div className="text-black">
            <h2 className="text-xl font-bold mb-4">Tambah Data Gudang</h2>
            <div className="mt-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormRenderer<Inventory> 
                    // @ts-ignore
                        formData={formDataInventory} 
                        register={register} 
                        control={control} 
                        errors={errors} 
                        setValue={setValue} 
                        gridClassname=" grid gap-5"/>

                    <div className="flex justify-end gap-6 mt-10">
                        {/* <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer">Simpan</button> */}
                        <Button title="Batal" variant="delete" onClick={reset}/>
                        <Button title="Simpan" type="submit" variant="submit"/>
                    </div> 
                </form>
            </div>
        </div>
    );
}