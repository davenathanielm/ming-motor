import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../../models/userModel/userModel";
import { updatePasswordService } from "../../../../services/userService";
import { AuthenticatedNextApiRequest, withAuth } from "../../../../lib/auth/helperAuth";

async function handler(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;
        const userId = String(id); // Convert id to a number

        if (req.method === "PUT") {
            const { password } = req.body; // Extract password from request body
            const result = await updatePasswordService(userId, password); // Pass userId and password to the service
            return res.status(result.status ?? 500).json({ success: result.success, message: result.message });
        }

        // Handle unsupported methods
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
export default withAuth(handler);

