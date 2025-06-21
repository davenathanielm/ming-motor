"use client";
import { Category } from "../../../../../models/categoryModel/categoryModel";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useUpdateCategoryProduct } from "../../../../../lib/calledAPI/service/serviceApiCategory";
import { formDataCategory } from "../../items/formTemplate";
import FormRenderer from "../../items/formRender";
import { toast } from "sonner";
import Button from "../../items/button";

type Props = {
    category : Category;
    onClose : () => void;
}

export default function UpdateCategoryPage ({category, onClose}: Props)  {
    
    const {register, handleSubmit, reset, setValue, control, formState: {errors}} = useForm<Category>();
    const mutationUpdateCategory = useUpdateCategoryProduct(category?.id_category);

    useEffect(()=>{
        if(category){
            reset(category);
        }
    },[category,reset]);

    const onSubmit = async(data : Category) => {
        try{
            await mutationUpdateCategory.mutateAsync(data);
            toast.success("Kategori berhasil diubah");
            onClose();
        }
        catch(error){
            toast.error("Kategori gagal diubah");
        }
    }

    return (
        <div className="text-black">
            <h2 className="text-xl font-bold mb-4">Perbarui Data Kategori</h2>
            <div className="mt-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormRenderer<Category> 
                    // @ts-ignore
                        formData={formDataCategory} 
                        register={register} 
                        control={control} 
                        errors={errors} 
                        setValue={setValue} 
                        gridClassname=" grid gap-5"/>

                    <div className="flex justify-end gap-6 mt-10">
                        <Button title="Batal" type= "reset" variant="delete" onClick={onClose}/>
                        <Button title="Simpan" type="submit" variant="submit"/>
                    </div> 
                </form>
            </div>
        </div>
    );
}