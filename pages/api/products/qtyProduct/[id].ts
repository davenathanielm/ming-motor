import { NextApiRequest, NextApiResponse } from "next";
import { updateQtyProductService } from "../../../../services/productService";
import { UpdateQtyData } from "../../../../models/productModel/productModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try{
        if (req.method === "PUT") {
            const {id} = req.query;
            const id_product = Number(id); 
            const {qty,id_supplier, id_inventory , hpp} = req.body;
            const updateData :UpdateQtyData = {qty,id_supplier, id_inventory ,hpp};
            const result = await updateQtyProductService(id_product as number, updateData);
            return res.status(result.status).json({ success: result.success, message: result.message, status: result.status });
        } else {
            return res.status(405).json({ success: false, message: "Method not allowed" });
        }   
    }catch(error:any){
        return res.status(500).json({ success: false, message: error.message });
    }
}