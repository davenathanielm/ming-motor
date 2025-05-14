"use client";
import { useState } from "react";
import React from "react";
import UpdateUsernameCard from "./usernameCard";
import updatePasswordCard from "./passwordCard";
import LayoutComponent from "../../layout/layoutComponent";
import { User } from "../../../../../models/userModel/userModel";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import FormRenderer from "../../items/formRender";
import { formVerifyPassword } from "../../items/formTemplate";
import { useCheckPassword } from "../../../../../lib/calledAPI/service/serviceApiUserProfile";

type Props ={
    id: string;
    onResult : (result:any) => void;
    onClose  :() => void;
}

export default function VerifyPasswordCard(Verify: Props) {
      const {
            register,
            handleSubmit,
            reset,
            setValue,
            control,
            formState: { errors },
        } = useForm<User>();
    
    const [step , setStep] = useState<"verify" | "username" | "password">("verify");
    const [user , setUser] = useState<string | null>(null);
    const [verifyPassword , setVerifyPassword] = useState<string | null>(null);
    const mutationInsertPassword = useCheckPassword(Verify.id);

    const onSubmit = async(data: User) => {
        try{
            const response = await mutationInsertPassword.mutateAsync(data);
            Verify.onResult({
                status: response.status,
                data: response.data,
            });
        }
        catch(error){
            
        }
    }
    
    return(
        <div className="text-black">
            <h2 className="font-bold text-xl">Verifikasi Password</h2>
            <p className="text-gray-500 text-sm mb-8 mt-1">Verifikasi untuk mengubah data diri anda </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormRenderer<User>
                    formData={formVerifyPassword} 
                    register={register} 
                    control={control} 
                    errors={errors} 
                    setValue={setValue} 
                    gridClassname="grid gap-5 text-black"
                />
                <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg hover:cursor-pointer mt-5">Lanjut</button>
            </form>
        </div>
    )
    
}