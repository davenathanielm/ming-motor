import { NextApiRequest, NextApiResponse } from "next";
import { searchBarcodeProductService } from "../../../../services/productService";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try{
        if (req.method === "POST") {
            const { barcode } = req.body;
            const result = await searchBarcodeProductService(barcode as string);
            return res.status(result.status).json({ success: result.success, data: result.data, message: result.message, status: result.status });
        } else {
            return res.status(405).json({ success: false, message: "Method not allowed" });
        }   
    }catch(error:any){
        return res.status(500).json({ success: false, message: error.message });
    }
}