"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./navbar";
import Topbar from "./topbar";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
};

const LayoutComponent = ({ children, title, subTitle }: LayoutProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Sidebar with backdrop animation */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setSidebarOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            {/* Sidebar Panel */}
            <motion.div
              className="fixed top-0 left-0 z-50 h-full w-72 bg-gray-100 shadow-lg rounded-tr-2xl rounded-br-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {/* @ts-ignore */}
              <Navbar onToggleMenu={() => setSidebarOpen(false)} role={session?.user?.role} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main layout content */}
      <div className="flex flex-1 flex-col h-full">
        <Topbar
          title={title}
          subTitle={subTitle}
          // @ts-ignore
          username={session?.user?.fullName || "Guest"}
          onToggleMenu={() => setSidebarOpen((prev) => !prev)}
        />
        <main className="flex-1  overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutComponent;
