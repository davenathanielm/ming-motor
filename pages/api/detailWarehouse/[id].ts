import { NextApiRequest , NextApiResponse } from "next";
import { updateDetailWarehouseService , deleteDetailWarehouseService } from "../../../services/detailWarehouseService";
import { DetailWarehouse } from "../../../models/detail_warehouse/detail_warehouse";

export default async function handler(req: NextApiRequest ,res: NextApiResponse){
    try{
        const {id} = req.query;
        const detailWarehouseId = Number(id);
        if(isNaN(detailWarehouseId)){
            return res.status(400).json({success:false, message:"Invalid detail warehouse ID"});
        }

        if(req.method === "PUT"){
            const {id_inventory, id_product} = req.body;
            const detailWarehouse: DetailWarehouse = {id_product, id_inventory};
            const result = await updateDetailWarehouseService(detailWarehouseId,detailWarehouse);
            return res.status(result.status).json({success:result.success, message:result.message});
        }

        if(req.method === "DELETE"){
            const result = await deleteDetailWarehouseService(detailWarehouseId);
            return res.status(result.status).json({success:result.success, message:result.message});
        }
    }
    catch(error: any){
        return res.status(500).json({success:false, message:error.message});
    }
}