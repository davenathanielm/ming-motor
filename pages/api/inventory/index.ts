import { NextApiRequest, NextApiResponse } from "next";
import { getAllInventoryService, insertInventoryService } from "../../../services/inventoryService";
import { Inventory } from "../../../models/inventoryModel/inventoryModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { AuthenticatedNextApiRequest , withAuth } from "../../../lib/auth/helperAuth";

async function handler(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
    try{
        const userId = req?.user?.id;
        if(req.method === "GET"){
            const inventories = await getAllInventoryService();
            return res.status(inventories.success ? 201 : 500).json(inventories);
        }

        if(req.method === "POST"){
            const {location , description} = req.body;
            const inventory: Inventory = {location , description};
            const result = await insertInventoryService(inventory , userId);
            return res.status(result.success ? 201 : 500).json(result);
        }
        return res.status(405).json({success:false,message:"Method not allowed"});
    }catch(error: any){
        return res.status(500).json({success:false,message:error.message});
    }
}

export default withAuth(handler);