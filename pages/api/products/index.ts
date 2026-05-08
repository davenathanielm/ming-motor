import { NextApiRequest, NextApiResponse } from "next";
import { getAllProductService , insertProductService } from "../../../services/productService";
import { Product } from "../../../models/productModel/productModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { AuthenticatedNextApiRequest , withAuth } from "../../../lib/auth/helperAuth";

async function handler(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
    try{
        const userId = req?.user?.id;
        const role = req?.user?.role || "staff";
        if(req.method === "GET"){
            // const {role} = req.query;
            const products = await getAllProductService(role as string);
            return res.status(products.success ? 201 : 500).json(products);
        }

        if(req.method === "POST"){
            const {name, qty,brand,hpp,selling_price,barcode, description,image,status,id_category,id_supplier,id_inventory} = req.body;
            // @ts-ignore
            const product: Product = {name, qty,brand,hpp,selling_price,barcode, description,image,status,id_category};
            const result = await insertProductService(product,id_supplier,id_inventory,userId);
            return res.status(result.success ? 201 : 500).json(result);
        }

        return res.status(405).json({success:false,message:"Method not allowed"});
    }catch(error: any){
        return res.status(500).json({success:false,message:error.message});
    }
}
export default withAuth(handler);

// information
// if pass from req.query it means it pass on api routes and use  const response = await API.get(`/api/products?role=${role}`); in axios to pass by routes
// only need to add ?role=owner in axios or ApiLink in postman