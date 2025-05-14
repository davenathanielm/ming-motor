import { NextApiResponse , NextApiRequest } from "next";
import { updateRoleService } from "../../../../services/userService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;
        const userId = String(id); // Convert id to a string

        if (req.method === "PUT") {
            const { role } = req.body; // Extract role from request body
            const result = await updateRoleService(userId, role); // Pass userId and role to the service
            return res.status(result.status ?? 500).json({ success: result.success, message: result.message });
        }

        // Handle unsupported methods
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}