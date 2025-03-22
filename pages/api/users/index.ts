import { NextApiRequest, NextApiResponse } from "next";
import { 
    getAllUsersService, 
    insertUserService 
} from "../../../services/userService";
import { User } from "../../../models/userModel/userModel"; // Import User type

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            const users = await getAllUsersService();
            return res.status(users.success ? 201:500).json(users);
        }

        if (req.method === "POST") {
            const { username, password, phone_number, role } = req.body;
            
            // Validate request body (optional)
            if (!username || !password || !phone_number || !role) {
                return res.status(400).json({ success: false, message: "Missing required fields" });
            }

            // ensure user from insert type same with User type from database
            const user: User = { username, password, phone_number, role };
            const result = await insertUserService(user);

            return res.status(result.success ? 201 : 500).json(result);
        }

        // Handle unsupported methods
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}
