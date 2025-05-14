import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../../models/userModel/userModel";
import { checkPasswordService } from "../../../../services/userService";

export default async function handler (req: NextApiRequest, res: NextApiResponse){
    try{
        const {id} = req.query;
        const userId = String(id); // Convert id to a string

        if(req.method === "PUT"){
            const { password } = req.body; // Extract password from request body
            const result = await checkPasswordService(userId,password); // Pass userId and password to the service
            return res.status(result.status ?? 500).json({ success: result.success, data: result.data, message: result.message, status: result.status });
        }

        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }catch(error: any){
        return res.status(500).json({ success: false, message: error.message });
    }
}