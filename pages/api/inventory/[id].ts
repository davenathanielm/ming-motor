import { NextApiRequest, NextApiResponse } from "next";
import { getInventoryByIdService, updateInventoryService, deleteInventoryService } from "../../../services/inventoryService";
import { Inventory } from "../../../models/inventoryModel/inventoryModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { AuthenticatedNextApiRequest, withAuth } from "../../../lib/auth/helperAuth";

async function handler(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;
        const inventoryId = Number(id);
        const userId = req?.user?.id;
        if (isNaN(inventoryId)) {
            return res.status(400).json({ success: false, message: "Invalid inventory ID" });
        }

        if (req.method === "GET") {
            const result = await getInventoryByIdService(inventoryId);
            return res.status(result.status).json({ success: result.success, data: result.data, message: result.message });
        }

        if (req.method === "PUT") {
            const { location, description } = req.body;
            const inventory: Inventory = { location, description };
            const result = await updateInventoryService(inventoryId, inventory,userId);
            return res.status(result.status).json({ success: result.success, message: result.message });
        }

        if (req.method === "DELETE") {
            const result = await deleteInventoryService(inventoryId , userId);
            return res.status(result.status).json({ success: result.success, message: result.message });
        }

    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export default withAuth(handler);
