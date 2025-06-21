import { NextApiRequest, NextApiResponse } from "next";
import { getProductByIdService , updateProductService, deleteProductService } from "../../../services/productService";
import { Product } from "../../../models/productModel/productModel";
import { injectOptionForm } from "@/app/utils/formUtils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const {id , role} = req.query;
        const productId = Number(id); 
        if (isNaN(productId)) {
            return res.status(400).json({ success: false, message: "Invalid product ID" });
        }

        if(req.method=== "GET"){
            const result = await getProductByIdService(productId , role as string);
           return res.status(result.status).json({ success: result.success, data: result.data, message: result.message }); 
        }

        if(req.method === "PUT"){
            const {name, qty,brand,hpp,selling_price,barcode, description,image,status,id_category,id_supplier,id_inventory} = req.body;
            // @ts-ignore
            const product : Product = {name, qty,brand,hpp,selling_price,barcode, description,image,status,id_category};
            const result = await updateProductService(productId,product,role as string);
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

// information
// 1. if you want to pass from req.query it means it pass on api routes and use  const response = await API.get(`/api/products/${id}?role=${role}`); in axios to pass by routes
// 2. only need to add ?role=owner in axios or ApiLink in postman