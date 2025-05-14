import { Category } from "../../../../../models/categoryModel/categoryModel";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useInsertCategoryProduct } from "../../../../../lib/calledAPI/service/serviceApiCategory";
import { formDataCategory } from "../../items/formTemplate";
import FormRenderer from "../../items/formRender";
import { toast } from "sonner";

export default function AddCategoryPage() {

    const {register, handleSubmit, reset, setValue, control, formState: {errors}} = useForm<Category>();
    const mutationInsertCategory = useInsertCategoryProduct();

    const onSubmit = async(data : Category) => {
        try{
            await mutationInsertCategory.mutateAsync(data);
            toast.success("Kategori berhasil ditambahkan");
            reset();
        }
        catch(error){
            toast.error("Kategori gagal ditambahkan");
        }
    }

    return(
        
        <div className="text-black">
            <h2 className="text-xl font-bold mb-4">Tambah Kategori</h2>
            <div className="mt-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormRenderer<Category> 
                        formData={formDataCategory} 
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