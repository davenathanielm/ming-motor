import { User } from "../../../../../models/userModel/userModel";
import {useForm} from "react-hook-form";
import { toast } from "sonner";
import FormRenderer from "../../items/formRender";
import { formUpdatePassword } from "../../items/formTemplate";
import { useUpdatePassword } from "../../../../../lib/calledAPI/service/serviceApiUserProfile";


type FormFields = {
  password: string;
  confirmPassword ?: string;
};

export default function UpdatePasswordCard({ user, onClose }: { user: any; onClose: () => void }) {
   
    const userId = user?.id_user;

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors },
        watch
    } = useForm<User>({
        mode: "onChange", //Triggers validation on every change
    });

    const updatePasswordMutation = useUpdatePassword(userId);

    const onSubmitPassword = async (data : FormFields)=> {
        if (data.password !== data.confirmPassword) {
        toast.error("Password dan konfirmasi password tidak cocok.");
        reset();
        return;
    }
        try{
            await updatePasswordMutation.mutateAsync({password : data.confirmPassword});
            toast.success("Password berhasil diperbarui.");
            reset();
            onClose();
        }
        catch(error:any){
            toast.error(error?.response?.data?.message ?? "Gagal memperbarui password.");
        }
    }
   
    return(
        <div className="text-black">
            <h2 className="font-bold text-xl">Update Password</h2>
            <p className="text-gray-500 text-sm mb-8 mt-1">Verifikasi untuk mengubah data anda </p>
            <form onSubmit={handleSubmit(onSubmitPassword)}>
                <FormRenderer<User>
                    formData={formUpdatePassword} 
                    register={register} 
                    control={control} 
                    errors={errors} 
                    setValue={setValue} 
                    watch={watch}
                    gridClassname="grid gap-5 text-black"
                />
                <button type="submit" className="bg-black text-white px-4 py-2 rounded-lg hover:cursor-pointer mt-5">Lanjut</button>
            </form>
        </div>
    )
}