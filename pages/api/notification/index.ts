import { NextApiRequest, NextApiResponse } from "next";
import { getAllNotificationService , insertNotificationService } from "../../../services/notificationService";
import { Notification } from "../../../models/notificationModel/notificationModel";
import { updateNotificationLastSeenService } from "../../../services/userService";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const session = await getServerSession(req, res, authOptions);
        const userId = session?.user?.id;
        // const {userId} = req.query;
        const statusNotification = '';

        if(req.method === "GET"){
            const notifications = await getAllNotificationService(userId);
            return res.status(notifications.success ? 201 : 500).json(notifications);
        }
 
        if(req.method === "POST"){
            const {type, message, action, entity_name, table_name} = req.body;
            // @ts-ignore
            const notification: Notification = {type, message, action, entity_name, table_name, id_user: userId};
            const result = await insertNotificationService(notification , userId);
            return res.status(result.success ? 201 : 500).json(result);
        }

        if(req.method === "PUT") {
            const result = await updateNotificationLastSeenService(userId);
            return res.status(result.success ? 200 : 500).json(result);
        }
        return res.status(405).json({success:false,message:"Method not allowed"});
    }catch(error: any){
        return res.status(500).json({success:false,message:error.message});
    }
}