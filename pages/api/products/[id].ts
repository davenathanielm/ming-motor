import { NextApiRequest, NextApiResponse } from "next";
import { getProductByIdService , updateProductService, deleteProductService } from "../../../services/productService";
import { Product } from "../../../models/productModel/productModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const {id} = req.query;
        const productId = Number(id); 
        if (isNaN(productId)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        if(req.method=== "GET"){
            const result = await getProductByIdService(productId);
           return res.status(result.status).json({ success: result.success, data: result.data, message: result.message }); 
        }

        if(req.method === "PUT"){
            const {name, qty,brand,hpp,selling_price,barcode, description,image,status,id_category,id_supplier,id_inventory} = req.body;
            const product : Product = {name, qty,brand,hpp,selling_price,barcode, description,image,status,id_category};
            const result = await updateProductService(productId,product,id_supplier,id_inventory);
            return res.status(result.status).json({success: result.success, message: result.message});
        }

        if(req.method === "DELETE"){
            const result = await deleteProductService(productId);
            return res.status(result.status).json({success:result.success, message:result.message});
        }

    }catch(error:any){
        return res.status(500).json({success:false,message:error.message});
    }
}