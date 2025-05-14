"use client";
import React, { useEffect } from "react";
import Navbar from "./navbar";
import Topbar from "./topbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LayoutComponent = ({ children, title, subTitle }: { children: React.ReactNode, title: any, subTitle: any }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <Navbar />

      {/* Main Content Wrapper */}
      <div className="flex-1">
        <Topbar title={title} subTitle={subTitle} username={session?.user?.fullName || ""} />
        <main className="p-2 flex-1 bg-white h-full">{children}</main>
      </div>
    </div>
  );
};

export default LayoutComponent;