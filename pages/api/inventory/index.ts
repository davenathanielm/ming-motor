import { NextApiRequest, NextApiResponse } from "next";
import { getAllInventoryService, insertInventoryService } from "../../../services/inventoryService";
import { Inventory } from "../../../models/inventoryModel/inventoryModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method === "GET"){
            const inventories = await getAllInventoryService();
            return res.status(inventories.success ? 201 : 500).json(inventories);
        }

        if(req.method === "POST"){
            const {location , description} = req.body;
            const inventory: Inventory = {location , description};
            const result = await insertInventoryService(inventory);
            return res.status(result.success ? 201 : 500).json(result);
        }
        return res.status(405).json({success:false,message:"Method not allowed"});
    }catch(error: any){
        return res.status(500).json({success:false,message:error.message});
    }
}