import { NextApiRequest, NextApiResponse } from "next";
import { getNotificationByIdService, getAllNotificationService, updateStatusNotificationService} from "../../../services/notificationService";
import { Notification } from "../../../models/notificationModel/notificationModel";

export default async function handler(req : NextApiRequest, res:NextApiResponse){
    try{
        const {id} = req.query;
        const notificationId = Number(id); 
        if (isNaN(notificationId)) {
            return res.status(400).json({ success: false, message: "Invalid notification ID" }); 
        }

        if(req.method=== "PUT"){
            const statusNotification = 'read';
            const result = await updateStatusNotificationService(notificationId , statusNotification);
            return res.status(result.status).json({ success: result.success, message: result.message }); 
        }
        
        // if(req.method=== "GET"){
        //     const result = await getNotificationByIdService(notificationId);
        //    return res.status(result.status).json({ success: result.success, data: result.data, message: result.message }); 
        // }
        
        // if(req.method === "PUT"){
        //     const {type, message, status, action, entity_name, table_name} = req.body;
        //     const notification : Notification = {type, message, status, action, entity_name, table_name};
        //     const result = await updateNotificationService(notificationId,notification);
        //     return res.status(result.status).json({success: result.success, message: result.message});
        // }

        // if(req.method === "DELETE"){
        //     const result = await deleteNotificationService(notificationId);
        //     return res.status(result.status).json({success:result.success, message:result.message});
        // }

    }catch(error:any){
        return res.status(500).json({success:false,message:error.message});
    }
}