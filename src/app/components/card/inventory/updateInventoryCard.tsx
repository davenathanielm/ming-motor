"use client";
import { useForm } from "react-hook-form";
import { Inventory } from "../../../../../models/inventoryModel/inventoryModel";
import { useEffect } from "react";
import { useUpdateInventory } from "../../../../../lib/calledAPI/service/serviceApiInventory";
import { formDataInventory } from "../../items/formTemplate";
import FormRenderer from "../../items/formRender";
import { toast } from "sonner";
import Button from "../../items/button";

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
            <h2 className="text-xl font-bold mb-4">Perbarui Data Gudang</h2>
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
                        <Button title="Batal" onClick={reset} variant="delete"/>
                        <Button title="Simpan" type="submit" variant="submit"/>
                    </div> 
                </form>
            </div>
        </div>
    );
}