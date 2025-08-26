import { NextApiRequest, NextApiResponse } from "next";
import { countNotificationUnreadService } from "../../../../services/notificationService";
import { Notification } from "../../../../models/notificationModel/notificationModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const session = await getServerSession(req, res, authOptions);
        const userId = session?.user?.id;
        if (!session) {
            return res.status(401).json({ success: false, message: "Unauthorized" }); 
        }
        // const {userId} = req.query;
        const statusNotification = '';

        if(req.method === "GET"){
            const notifications = await countNotificationUnreadService(userId);
            return res.status(notifications.success ? 201 : 500).json(notifications);
        }
        return res.status(405).json({success:false,message:"Method not allowed"});
    }catch(error: any){
        return res.status(500).json({success:false,message:error.message});
    }
}