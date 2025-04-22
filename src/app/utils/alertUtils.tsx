import { useToastAlert } from "../components/alert/useToastAlert";
import {toast , Toaster } from "sonner";

export const useProductAlert = () => {
    useToastAlert({
        "update-success": (params? : string) => toast.success(`Produk ${params ?? ""} berhasil diperbarui!`),
        "update-failed": (params? : string) => toast.error(`Gagal memperbarui produk.`),
        "add-success": (params? : string) => toast.success(`Produk berhasil ditambahkan!`),
  });
};