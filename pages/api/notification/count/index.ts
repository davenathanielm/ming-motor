import { NextApiRequest, NextApiResponse } from "next";
import { countNotificationUnreadService } from "../../../../services/notificationService";
import { Notification } from "../../../../models/notificationModel/notificationModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { AuthenticatedNextApiRequest , withAuth } from "../../../../lib/auth/helperAuth";

async function handler(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
    try{
        const userId = req?.user?.id;
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
export default withAuth(handler);