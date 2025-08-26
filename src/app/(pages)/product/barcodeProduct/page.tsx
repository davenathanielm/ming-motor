"use client"
import { useState } from "react";
import ScannerProductPage from "./scannerProduct";
import UpdateQtyProductPage from "./updateQtyProduct";
import AddProductPageBarcode from "./addProductPage";
import LayoutComponent from "@/app/components/layout/layoutComponent";
import { Product } from "../../../../../models/productModel/productModel";
import { useSession } from "next-auth/react";

export default function BarcodeProductPage() {
    const [flowStep, setflowStep] = useState<"scanner"|"qty"|"add">("scanner");
    const[productData, setProductData] = useState<Product|null> (null);
    const[scannedBarcode, setScannedBarcode] = useState<string | null>(null);
    const {data:session} = useSession();
    
    const handleBarcodeResult = (result : {status: number; data: Product; barcode: string}) => {
        setScannedBarcode(result.barcode);
        if (result.status === 200 || result.status === 201) {
            // @ts-ignore
            setProductData(result.data.data!);
            setflowStep("qty");
        } else if (result.status === 404) {
            setProductData(null);
            setflowStep("add");
        } else {
            console.error("Unexpected status code:", result.status);
        }
    }

    return (
            <LayoutComponent title={" "} subTitle={" Home / Scanner "}>
                <div className="px-14 py-10">
                        {flowStep === "scanner" && <ScannerProductPage onResult={handleBarcodeResult}/>}
                        {flowStep === "qty" && productData && <UpdateQtyProductPage product={productData} onBack={() => setflowStep("scanner")} userId={session?.user?.id}/>}
                        {flowStep === "add" && scannedBarcode && <AddProductPageBarcode defaultBarcode={scannedBarcode} onBack={() => setflowStep("scanner")} role = {session?.user?.role} userId={session?.user?.id} />}
                </div>
            </LayoutComponent>
    );
}