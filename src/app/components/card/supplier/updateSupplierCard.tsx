"use client";
import { Supplier } from "../../../../../models/supplierModel/supplierModel";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useUpdateSupplier } from "../../../../../lib/calledAPI/service/serviceApiSupplier";
import { formDataSupplier } from "../../items/formTemplate";
import FormRenderer from "../../items/formRender";
import { toast } from "sonner";
import Button from "../../items/button";

type Props = {
    supplier : Supplier;
    onClose: () => void;
}

export default function UpdateSupplierPage({supplier , onClose} : Props){

    const {register, handleSubmit, reset, setValue, control, formState: {errors}} = useForm<Supplier>();

    // this part that do auto fill to the form when the page is loaded
    useEffect(()=>{
        if(supplier){
            reset(supplier);
        }
    },[supplier,reset]);

    const mutationUpdateSupplier = useUpdateSupplier(supplier?.id_supplier);

    const onSubmit = async(data: Supplier) => {
        try{
            await mutationUpdateSupplier.mutateAsync(data);
            toast.success("Supplier berhasil diubah");
            onClose();
        }
        catch(error){
            toast.error("Supplier gagal diubah");
        }
    }

    return(
        <div className="text-black">
            <h2 className="text-xl font-bold mb-4">Update Supplier</h2>
            <div className="mt-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormRenderer<Supplier>
                        // @ts-ignore 
                        formData={formDataSupplier} 
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
    )
}