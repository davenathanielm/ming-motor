import { Supplier } from "../../../../../models/supplierModel/supplierModel";
import { useForm } from "react-hook-form";
import { useEffect,useRef, useState } from "react";
import { useInsertSupplier } from "../../../../../lib/calledAPI/service/serviceApiSupplier";
import { formDataSupplier } from "../../items/formTemplate";
import FormRenderer from "../../items/formRender";
import { toast } from "sonner";
import Button from "../../items/button";

export default function AddSupplierPage() {
    const {register, handleSubmit, reset, setValue, control, formState: {errors}} = useForm<Supplier>();
    const mutationInsertSupplier = useInsertSupplier();

    const onSubmit = async(data: Supplier) => {
        try{
            await mutationInsertSupplier.mutateAsync(data);
            toast.success("Supplier berhasil ditambahkan");
            reset();
        }
        catch(error){
            toast.error("Gagal menambahkan supplier");
        }
    }

    return(
        <div className="text-black">
            <h2 className="text-xl font-bold mb-4">Tambah Supplier</h2>
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
    );
}