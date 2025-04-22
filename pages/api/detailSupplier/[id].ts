import { NextApiRequest , NextApiResponse } from "next";
import { updateDetailSupplierService , deleteDetailSupplierService } from "../../../services/detailSupplierService";
import { DetailSupplier } from "../../../models/detail_supplier/detail_supplier";

export default async function handler(req: NextApiRequest ,res: NextApiResponse){
    try{
        const {id} = req.query;
        const detailId = Number(id);
        if(isNaN(detailId)){
            return res.status(500).json({success:false, message:"id must be a number"});
        }
        // if(req.method === "PUT"){
        //     const {id_supplier, id_product} = req.body;
        //     const detailSupplier: DetailSupplier = {id_product, id_supplier};
        //     const result = await updateDetailSupplierService(detailId,detailSupplier);
        //    return res.status(result.status).json({success: result.success, message: result.message});
        // }

        if(req.method === "DELETE"){
            const result = await deleteDetailSupplierService(detailId);
            return res.status(result.status).json({success: result.success, message: result.message});
        }
    }
    catch(error: any){
        return res.status(500).json({success:false, message:error.message});
    }
}