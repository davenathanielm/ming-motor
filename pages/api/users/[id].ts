import { NextApiRequest, NextApiHandler, NextApiResponse } from "next";
import { User } from "../../../models/userModel/userModel";
import { getUserByIdService, updateUserService, deleteUserService } from "../../../services/userService";

export default async function handler(req: NextApiRequest, res:NextApiResponse){
    try{
        const {id} = req.query;
        const userId = Number(id);
        if(req.method === "GET"){
            if(!isNaN(userId)){
                const result = await getUserByIdService(userId);
                return res.status(result ? 201 : 500).json(result);
            }else{
                return res.status(400).json({success:false,message:"Invalid user id"});
            }
        }

        if(req.method === "PUT"){
            
            const {username,password,phone_number,fullName,role} = req.body;
            
            if(!username || !password || !phone_number || !fullName){
                return res.status(400).json({success:false,message:"Missing required fields"});
            }
            const user: User = {username,fullName,password,phone_number};
            const result = await updateUserService(userId,user);
            return res.status(result.success ? 201 : 500).json(result);
        }

        if(req.method === "DELETE"){
            if(isNaN(userId)){
                return res.status(400).json({success:false,message:"Invalid user id"});
            }
            const result = await deleteUserService(userId);
            return res.status(result.success ? 201 : 500).json(result);
        }

        return res.status(405).json({success:false,message:"Method not allowed"});
    }catch(error: any){
        return res.status(500).json({success:false,message:error.message});
    }
}