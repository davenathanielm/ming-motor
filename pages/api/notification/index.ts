import { NextApiRequest, NextApiResponse } from "next";
import { getAllNotificationService , insertNotificationService } from "../../../services/notificationService";
import { Notification } from "../../../models/notificationModel/notificationModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method === "GET"){
            const notifications = await getAllNotificationService();
            return res.status(notifications.success ? 201 : 500).json(notifications);
        }

        if(req.method === "POST"){
            const {type, message, status, action, entity_name, table_name} = req.body;
            const notification: Notification = {type, message, status, action, entity_name, table_name};
            const result = await insertNotificationService(notification);
            return res.status(result.success ? 201 : 500).json(result);
        }

        return res.status(405).json({success:false,message:"Method not allowed"});
    }catch(error: any){
        return res.status(500).json({success:false,message:error.message});
    }
}