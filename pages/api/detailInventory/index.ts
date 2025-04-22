import { NextApiRequest , NextApiResponse } from "next";
import { getAllDetailWarehouseService , insertDetailWarehouseService, updateDetailWarehouseService } from "../../../services/detailWarehouseService";
import { DetailWarehouse } from "../../../models/detail_warehouse/detail_warehouse";

export default async function handler(req: NextApiRequest ,res: NextApiResponse){
    try{
        if(req.method === "GET"){
            const detailWarehouse = await getAllDetailWarehouseService();
            return res.status(detailWarehouse.success ? 201 : 500).json(detailWarehouse);
        }

        if(req.method === "POST"){
            const {id_inventory, id_product} = req.body;
            const detailWarehouse: DetailWarehouse = {id_product, id_inventory};
            const result = await insertDetailWarehouseService(detailWarehouse);
            return res.status(result.success ? 201 : 500).json(result);
        }

        if(req.method === "PUT"){
            const {id_inventory, id_product} = req.body;
            const detailWarehouse: DetailWarehouse = {id_product, id_inventory};
            const result = await updateDetailWarehouseService(detailWarehouse);
            return res.status(result.status).json({success:result.success, message:result.message});
        }
    }
    catch(error: any){
        return res.status(500).json({success:false, message:error.message});
    }
}