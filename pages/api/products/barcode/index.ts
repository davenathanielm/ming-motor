import { NextApiRequest, NextApiResponse } from "next";
import { searchBarcodeProductService } from "../../../../services/productService";
import { fetchAllBarcode } from "../../../../models/productModel/productModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try{
        const session = await getServerSession(req, res, authOptions);
        const role = session?.user?.role;
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        if (req.method === "POST") {
            const { barcode } = req.body;
            // const { role} = req.query;
            const result = await searchBarcodeProductService(barcode as string , role as string);
            return res.status(result.status).json({ success: result.success, data: result.data, message: result.message, status: result.status });
        }
        else if (req.method === "GET"){
            const result = await fetchAllBarcode();
            return res.status(201).json({ success: true, data: result, message: "All barcodes fetched successfully" });
        }
        else {
            return res.status(405).json({ success: false, message: "Method not allowed" });
        }   
    }catch(error:any){
        return res.status(500).json({ success: false, message: error.message });
    }
}