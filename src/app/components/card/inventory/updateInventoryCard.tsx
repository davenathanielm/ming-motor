"use client";
import { useForm } from "react-hook-form";
import { Inventory } from "../../../../../models/inventoryModel/inventoryModel";
import { useEffect } from "react";
import { useUpdateInventory } from "../../../../../lib/calledAPI/service/serviceApiInventory";
import { formDataInventory } from "../../items/formTemplate";
import FormRenderer from "../../items/formRender";
import { toast } from "sonner";

type Props = {
    inventory: Inventory;
    onClose: () => void;
}

export default function UpdateInventoryPage ({inventory, onClose}: Props) {

    const {register, handleSubmit, reset, setValue, control, formState: {errors}} = useForm<Inventory>();
    const mutationUpdateInventory = useUpdateInventory(inventory?.id_inventory);
    
    console.log("inventory",inventory);
    
    useEffect(()=>{
        if(inventory){
            reset(inventory);
        }
    },[inventory,reset]);

    const onSubmit = async(data: Inventory) => {
        try{
            await mutationUpdateInventory.mutateAsync(data);
            toast.success("Inventory berhasil diubah");
            onClose();
        }
        catch(error){
            toast.error("Inventory gagal diubah");
        }
    }

    return (
        <div className="text-black">
            <h2 className="text-xl font-bold mb-4">Update Inventory</h2>
            <div className="mt-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormRenderer<Inventory> 
                        formData={formDataInventory} 
                        register={register} 
                        control={control} 
                        errors={errors} 
                        setValue={setValue} 
                        gridClassname=" grid gap-5"/>
                    <div className="flex justify-end gap-6 mt-10">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer">Simpan</button>
                    </div> 
                </form>
            </div>
        </div>
    );
}