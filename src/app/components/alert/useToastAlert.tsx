"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";

type ToastMap = {
  [key: string]: (param: string) => void;
};

export const useToastAlert = (toastMap: ToastMap) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasShownRef = useRef(false); // 👈 Add this

  useEffect(() => {
    if (!searchParams || hasShownRef.current) return;

    const toastParam = searchParams.get("toast");
    const name = searchParams.get("name");
    console.log(searchParams.toString());

    if (toastParam && toastMap[toastParam]) {
      toast.dismiss();
      toastMap[toastParam](name || "");

      hasShownRef.current = true; // ✅ Prevent future runs

      const timeout = setTimeout(() => {
        const url = new URL(window.location.href);
        url.searchParams.delete("toast");
        router.replace(url.toString(), { scroll: false });
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [searchParams, toastMap, router]);
};
