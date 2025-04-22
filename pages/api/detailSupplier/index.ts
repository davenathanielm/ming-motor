import { NextApiRequest, NextApiResponse } from "next";
import { getAllDetailSupplierService , insertDetailSupplierService, updateDetailSupplierService } from "../../../services/detailSupplierService";
import { DetailSupplier } from "../../../models/detail_supplier/detail_supplier";

export default async function handler(req: NextApiRequest ,res: NextApiResponse){
    try{
        if(req.method === "GET"){
            const detailSupplier = await getAllDetailSupplierService();
            return res.status(detailSupplier.success ? 201 : 500).json(detailSupplier);
        }

        if(req.method === "POST"){
            const {id_supplier, id_product} = req.body;
            const detailSupplier: DetailSupplier = {id_product, id_supplier};
            const result = await insertDetailSupplierService(detailSupplier);
            return res.status(result.success ? 201 : 500).json(result);
        }
        
        if(req.method === "PUT"){
            const {id_supplier, id_product} = req.body;
            const detailSupplier: DetailSupplier = {id_product, id_supplier};
            const result = await updateDetailSupplierService(detailSupplier);
           return res.status(result.status).json({success: result.success, message: result.message});
        }
    }
    catch(error: any){
        return res.status(500).json({success:false, message:error.message});
    }
}