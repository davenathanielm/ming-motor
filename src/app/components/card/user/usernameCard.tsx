import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateUsername } from "../../../../../lib/calledAPI/service/serviceApiUserProfile";
import { User } from "../../../../../models/userModel/userModel";
import FormRenderer from "../../items/formRender";
import { formUpdateUsername } from "../../items/formTemplate";

type FormFields = {
  password: string;
  username: string;
};

export default function UpdateUsernameCard({ user, onClose }: { user: User; onClose: () => void }) {

  console.log("userId coba UsernameCard :", user);
  const userId = user?.id_user;

  const {
            register,
            handleSubmit,
            reset,
            setValue,
            control,
            formState: { errors },
        } = useForm<User>();
    

  const updateUsernameMutation = useUpdateUsername(userId);


  const onSubmitUsername = async (data: FormFields) => {
    try {
      await updateUsernameMutation.mutateAsync({ username: data.username });
      toast.success("Username berhasil diperbarui.");
      reset();
      onClose();
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Gagal memperbarui username.");
    }
  };

  return (
     <div className="text-black">
            <h2 className="font-bold text-xl">Update Username</h2>
            <p className="text-gray-500 text-sm mb-8 mt-1">Verifikasi untuk mengubah data anda </p>
            <form onSubmit={handleSubmit(onSubmitUsername)}>
                <FormRenderer<User>
                    formData={formUpdateUsername} 
                    register={register} 
                    control={control} 
                    errors={errors} 
                    setValue={setValue} 
                    gridClassname="grid gap-5 text-black"
                />
                <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg hover:cursor-pointer mt-5">Lanjut</button>
            </form>
        </div>
  );
}
