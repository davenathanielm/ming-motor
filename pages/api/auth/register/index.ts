import { NextApiResponse, NextApiRequest } from "next";
import { hashPassword } from "../../../../lib/auth/hash";
import { insertUserService } from "../../../../services/userService";
import { User } from "../../../../models/userModel/userModel";

export default async function handler (req: NextApiRequest , res : NextApiResponse) {
    if(req.method == "POST"){
        const {username, password, phone_number, fullName} = req.body;
        const hashedPassword = await hashPassword(password);
        const user : any= {
            username,
            password: hashedPassword,
            phone_number,
            fullName
        };
        const userResult = await insertUserService(user);
        if(userResult.success){
            return res.status(201).json({ message: userResult.message});
        }
        
        else{
            return res.status(500).json({ message: userResult.message });
        }
    }
    else{
        return res.status(405).json({ message: "Method not allowed" });
    }
}