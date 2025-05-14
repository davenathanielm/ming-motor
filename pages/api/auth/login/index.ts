import { NextApiRequest, NextApiResponse } from "next";
import { checkUsernameService } from "../../../../services/userService";
import { comparePassword } from "../../../../lib/auth/hash";
import { signToken } from "../../../../lib/auth/auth";
import {serialize} from "cookie";

export default async function handler(req: NextApiRequest, res:NextApiResponse){
    if(req.method === "POST"){

        const {username, password} = req.body;
        const userResult = await checkUsernameService(username);
        
        if(userResult.success){
            const user = userResult.data || "";
            // @ts-ignore
            const passwordResult = await comparePassword(password, user.password);
            if(passwordResult){
                // @ts-ignore
                const token = signToken({id: user.id_user, username: user.username});
                
                const cookie = serialize("token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    maxAge: 60 * 60 * 24, // 1 day
                    sameSite: "strict",
                    path: "/",
                });

                res.setHeader("Set-Cookie", cookie);

                return res.status(200).json({success:true, message:"Login successful", token});
            }
            else{
                return res.status(401).json({success:false, message:"Invalid password"});
            }
        }
        else{
            return res.status(404).json({success:false, message:"User not found"});
        }
    }
    else{
        return res.status(405).json({success:false, message:"Method not allowed"});
    }
}
// Information
// 1. these doesn't need to be compare username and password in the sametime because when i look for username it will give user.password which is mean it is the password from that user who login so it automatically same user and same password