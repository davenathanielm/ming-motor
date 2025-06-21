"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { User } from "../../../../../models/userModel/userModel";
import FormRenderer from "@/app/components/items/formRender";
import { formRegister } from "@/app/components/items/formTemplate";
import { authImage } from "@/app/components/items/image";
import { useRegisterUser } from "../../../../../lib/calledAPI/service/serviceApiUserProfile";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterPage(){
    const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<User>();

  const mutationUser =  useRegisterUser();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (formData : User) => {
    setLoading(true);
    try {
      await mutationUser.mutateAsync(formData)
      router.push("/employee")
      toast.success("Registered successfully!");
    } catch (err) {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return(
        <div className="flex justify-center items-center min-h-screen">
            <div className="flex bg-white shadow-xl rounded-2xl overflow-hidden max-w-4xl w-full">
                {/* Image Section */}
                <div className="w-[650px] h-[500px] relative">
                        <Image
                            src={authImage.warehouse3}
                            alt=""
                            fill
                            className="object-cover rounded-2xl"
                        />
                </div>

                {/* Form Section */}
                <div className="flex flex-col justify-center p-10 w-full text-black">
                  <h1 className="text-2xl font-semibold mb-1">Let's Get Started.</h1>
                  <p className="text-sm text-gray-600 mb-6">
                    Hey! Nice to meet you
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormRenderer<User>
                      // @ts-ignore
                      formData={formRegister}
                      register={register}
                      control={control}
                      errors={errors}
                      setValue={setValue}
                      gridClassname="grid gap-5"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting || loading}
                      className="bg-black hover:bg-black/80 text-white w-full py-2 mt-8 rounded-full"
                    >
                      {loading ? "Loading..." : "Register"}
                    </button>
                      {/* <div className="flex gap-1 text-sm text-gray-500 mt-4 justify-center">
                          <p>Sudah Punya Akun ?</p> 
                          <a href="/auth/login" className="text-blue-500 hover:underline">Masuk disini</a>
                      </div> */}
                  </form>
                </div>
            </div>
        </div>

  );
  
}

