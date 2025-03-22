import { NextApiRequest, NextApiResponse } from "next";
import { getInventoryByIdService, updateInventoryService, deleteInventoryService } from "../../../services/inventoryService";
import { Inventory } from "../../../models/inventoryModel/inventoryModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;
        const inventoryId = Number(id);
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
            const result = await updateInventoryService(inventoryId, inventory);
            return res.status(result.status).json({ success: result.success, message: result.message });
        }

        if (req.method === "DELETE") {
            const result = await deleteInventoryService(inventoryId);
            return res.status(result.status).json({ success: result.success, message: result.message });
        }

    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}