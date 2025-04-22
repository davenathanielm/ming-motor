import { NextApiRequest, NextApiResponse } from "next";
import { getAllProductService , insertProductService } from "../../../services/productService";
import { Product } from "../../../models/productModel/productModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method === "GET"){
            const products = await getAllProductService();
            return res.status(products.success ? 201 : 500).json(products);
        }

        if(req.method === "POST"){
            const {name, qty,brand,hpp,selling_price,barcode, description,image,status,id_category,id_supplier,id_inventory} = req.body;
            const product: Product = {name, qty,brand,hpp,selling_price,barcode, description,image,status,id_category};
            const result = await insertProductService(product,id_supplier,id_inventory);
            return res.status(result.success ? 201 : 500).json(result);
        }

        return res.status(405).json({success:false,message:"Method not allowed"});
    }catch(error: any){
        return res.status(500).json({success:false,message:error.message});
    }
}