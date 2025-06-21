"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { User } from "../../../../../models/userModel/userModel";
import FormRenderer from "@/app/components/items/formRender";
import { formLogin } from "@/app/components/items/formTemplate";
import { authImage } from "@/app/components/items/image";
import AuthLayout from "@/app/components/card/user/authCard";
import { useRouter } from "next/navigation";
import {signIn} from "next-auth/react";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<User>();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

const onSubmit = async (formData: User) => {
  setLoading(true);

  try {
    const res = await signIn("credentials", {
      redirect: false, // it means it will not auto redirect after sign in
      username: formData.username, //this is match with credentials in [...nextAuth].ts
      password: formData.password, //this is match with credentials in [...nextAuth].ts
    });

    console.log("res nya", res);
    if (res?.ok) {
      toast.success("Logged in successfully!");
      router.push("/displayApps");
    } else if (res?.status === 401) {
      toast.error("Username atau password salah");
    } else {
      toast.error("Login failed");
    }

  } catch (err) {
    toast.error("Network error or server unreachable");
    console.error("SignIn failed:", err);
  } finally {
    setLoading(false);
  }
}

  return (
    <AuthLayout imageSrc={authImage.warehouse4} imageAlt={authImage.warehouse1} >
        <h1 className="text-2xl font-semibold mb-1">Hi Boss.</h1>
          <p className="text-sm text-gray-600 mb-6">
            Welcome back to Ming-Motor
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormRenderer<User>
              // @ts-ignore
              formData={formLogin}
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
              {loading ? "Logging in..." : "Masuk"}
            </button>
            {/* <div className="flex gap-1 text-sm text-gray-500 mt-4 justify-center">
                <p>Belum punya akun ?</p> 
                <a href="/auth/register" className="text-blue-500 hover:underline">Daftar disini</a>
            </div> */}
          </form>
    </AuthLayout>
  );

}

// information"
// 1. use signIn from next-auth/react to handle login and redirect to dashboard page
// 2. signIn and insert credential provider name to call the function



