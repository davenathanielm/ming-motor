'use client';
import LayoutComponent from "@/app/components/layout/layoutComponent";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/auth/login" }); // Log out and redirect to login page
  };

  return (
    // @ts-ignore
    <LayoutComponent title={``} subTitle={`Home`}>
      <div className="px-14 py-10">
        <header>
          {/* @ts-ignore */}
            <h1 className="text-black font-bold text-2xl">{`Welcome Back ${session?.user?.username}`}</h1>
            <p className="text-gray-500">Grab ur coffe and start working!</p>
          </header> 
          <div className="rounded-xl bg-amber-100 mt-5"></div>

          <button onClick={handleLogout} className="text-black bg-amber-500 p-3 rounded-xl hover: cursor-pointer">Log Out</button>
      </div>
    </LayoutComponent>
  );
}
