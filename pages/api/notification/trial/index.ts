import { NextApiRequest, NextApiResponse } from "next";
import {   insertNotificationReceiverService } from "../../../../services/notificationService";
import { getAllRoles } from "../../../../models/notificationModel/notificationModel";
import { getAllRolesService } from "../../../../services/notificationService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method === "GET"){
            const roles = await getAllRolesService();
            return res.status(200).json({success:true, data: roles});
        }
        if(req.method === "POST"){
            const {id_notification, notificationReceiver} = req.body;
            const result = await insertNotificationReceiverService(id_notification,notificationReceiver);
            return res.status(result.success ? 201 : 500).json(result);
        }
        return res.status(405).json({success:false,message:"Method not allowed"});
    }catch(error: any){
        return res.status(500).json({success:false,message:error.message});
    }
}