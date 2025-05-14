"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LayoutComponent from "@/app/components/layout/layoutComponent";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { formDataProfile } from "@/app/components/items/formTemplate";
import FormRenderer from "@/app/components/items/formRender";
import { User } from "../../../../models/userModel/userModel";
import Modal from "@/app/components/modal/modal";
import UpdateCredential from "@/app/components/card/user/updateCredentialCard";
import { useFetchUserById } from "../../../../lib/calledAPI/service/serviceApiUserProfile";
import { useUpdateUser } from "../../../../lib/calledAPI/service/serviceApiUserProfile";
import { toast } from "sonner";
import { formatDate } from "@/app/components/items/date";

export default function UserPage() {
  const { data: session , status } = useSession();
  const router = useRouter();
  const userId = session?.user?.id;

  const {register,handleSubmit,reset,setValue,control,formState: { errors },} = useForm<User>();

  const [updateUsername, setUpdateUsername] = useState<String | null>(null);
  const [updatePassword, setUpdatePassword] = useState<String | null>(null);

  const mutationUpdateUser = useUpdateUser(userId);
  const { data: userData, isLoading } = useFetchUserById(userId);

  const {id_user, role, created_at , updated_at } = userData || {};
  const dateCreated = formatDate(created_at?.toString());
  const dateUpdated = formatDate(updated_at?.toString());

  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  },[userData, reset]);

  const onSubmit = async (data: User) => {
    try{
      await mutationUpdateUser.mutateAsync(data);
      toast.success("Data pengguna berhasil diperbarui.");
    }
    catch(error){
      toast.error("Gagal memperbarui data pengguna.");
    }
    // TODO: add update logic here
  };
  
  const handleUpdateUsername = (id: any) => {
    setUpdateUsername(id);
  }

  const handleUpdatePasswords = (id: any) => {
    setUpdatePassword(id);
  }
  return (
    <LayoutComponent title={""} subTitle={"Home / User"}>
      <div className="p-4">
        <header>
          <h1 className="text-black font-bold text-2xl">Pengaturan Akun</h1>
          <p className="text-gray-500">Preferensi Akun dan Pengaturan</p>
        </header>

        <UserCard
          title="Informasi Pribadi"
          subTitle="Manage your profile information"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormRenderer<User>
              formData={formDataProfile}
              register={register}
              control={control}
              errors={errors}
              setValue={setValue}
              gridClassname="grid grid-cols-2 gap-5 text-black"
            />
            <div className="flex justify-start mt-5">
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded-lg hover:cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </form>
        </UserCard>

        <UserCard
          title="Keamanan"
          subTitle="Ubah username dan password anda untuk menjaga keamanan akun"
        >
          <div className="flex flex-col gap-6">
            <SecurityItem
              label="Username"
              description="Ubah username anda untuk menjaga keamanan akun"
              buttonLabel="Ubah Username"
              onClick={() => handleUpdateUsername(userId)}
            />
            <div className="h-[2px] bg-gray-200 w-full"></div>
            <SecurityItem
              label="Password"
              description="Ubah password anda untuk menjaga keamanan akun"
              buttonLabel="Ubah Password"
              onClick={() => handleUpdatePasswords(userId)}
            />
          </div>
        </UserCard>

        <UserCard title="Detail Akun" subTitle="Melihat data akun anda">
          <div className="grid grid-cols-2 gap-5">
            <DetailItem label="Id Akun" value={id_user} />
            <DetailItem label="Role" value={role} />
            <DetailItem label="Pengguna Sejak" value={dateCreated} />
            <DetailItem label="Tanggal Update Profile" value={dateUpdated} />
          </div>
        </UserCard>

        <UserCard
          title="Zona Berbahaya"
          subTitle="Tindakan yang tidak dapat dibatalkan dan berbahaya"
          borderColor="border-red-500"
          textColor="text-red-500"
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <h2 className="text-black text-base">Hapus Akun</h2>
              <p className="text-red-500 text-sm">
                Menghapus akun anda secara permanen
              </p>
            </div>
            <button
              type="button"
              className="border bg-red-500 border-red-500 text-white text-base px-4 py-2 rounded-lg hover:cursor-pointer"
            >
              Hapus Akun
            </button>
          </div>
        </UserCard>

        <Modal 
          isOpen={!!updateUsername}
          onClose={() => setUpdateUsername(null)}>
          {updateUsername &&(
            <UpdateCredential 
              userId={updateUsername} 
              onClose={() => setUpdateUsername(null)} 
              type = "username"
            />
          )}
        </Modal>

        <Modal
          isOpen = {!!updatePassword}
          onClose={() => setUpdatePassword(null)}>
          {updatePassword &&(
            <UpdateCredential
              userId={updatePassword}
              onClose={() => setUpdatePassword(null)}
              type = "password"
            />
          )}        
        </Modal>
        
      </div>
    </LayoutComponent>
  );
}

// Card Wrapper
function UserCard({
  title,
  subTitle,
  children,
  textColor = "text-black",
  borderColor = "border-gray-300"
}: {
  title: string;
  subTitle: string;
  children: React.ReactNode;
  textColor?: string;
  borderColor?: string;
}) {
  return (
    <section className={`border ${borderColor} rounded-lg p-4 mt-8 mb-4`}>
      <h2 className={`${textColor} font-bold text-xl`}>{title}</h2>
      <p className="text-gray-500 text-sm mb-8 mt-1">{subTitle}</p>
      {children}
    </section>
  );
}

// Security Settings Item
function SecurityItem({
  label,
  description,
  buttonLabel,
  onClick 
}: {
  label: string;
  description: string;
  buttonLabel: string;
  onClick?: () => void;
}) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-1">
        <h3 className="text-black text-base">{label}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      <button
        type="button"
        className="border border-gray-300 text-black text-base px-4 py-2 rounded-lg hover:cursor-pointer"
        onClick={onClick}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

// Detail Item
function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="text-gray-600 text-sm">{label}</h4>
      <p className="text-black text-sm">{value}</p>
    </div>
  );
}
