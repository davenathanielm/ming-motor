import { getAllNotification,getNotificationById,insertNotification,insertUserNotification,Notification,markNotificationAsRead, NotificationUser, countNotificationUnread, NotificationReceiver, insertNotificationReceiver, insertNotificationRole ,getAllRoles, insertNotificationUser, getAllUsers} from "../models/notificationModel/notificationModel";

export async function getAllNotificationService(userId : any , roleId ?: any , statusNotification ?: any): Promise<{ success: boolean; data?: any; message?: string; status : number}> {
    try {
        const roletry = 1;
        const notification = await getAllNotification(userId,roleId,1,10,statusNotification);
        const count = await countNotificationUnread(userId);
        return {success: true, data: {notification, count , roleId}, status: 200}; 
    } catch (error: any) {
        return {success: false, message: error.message, status: 500}; 
    }
}

export async function getNotificationByIdService(id_notification : number) : Promise<{ success: boolean; data?: Notification; message?: string; status:number}> {
    try{
        const notification = await getNotificationById(id_notification);
        if(notification){
            return {success: true, data: notification, status: 201}
        }
        else{
            return {success: false, status: 404, message: "Notification not found"}
        }

    } catch (error : any){
        return {success: false, message:error.message , status:500}
    }
}

export async function insertNotificationService(notification:Notification , userId : any) : Promise<{success: boolean; data?:any; message?:string}>{
    try{
        const result = await insertNotification(notification);
        // if(result){
        //     // @ts-ignore
        //     const notificationUser: NotificationUser = {id_notification: result, id_user: notification.id_user , triggered_by: userId};
        //     await insertUserNotification(notificationUser)
        // }
        return {success:true, message:"Notification inserted successfully" ,  data: result}
        // else {
        //     return {success:false, message:"Failed to insert user notification"}
        // }
    }catch(error:any){
        return {success:false, message:error.message}
    }
}

export async function insertNotificationReceiverService(id_notification : any, notificationReceiver : NotificationReceiver[] , type ?: string) : Promise<{success: boolean; data?:Notification; message?:string}>{
    try{
        if(type === "role"){
            const result = await insertNotificationRole(id_notification,notificationReceiver);
            if(result){
                return {success:true, message:"Notification Receiver inserted successfully"} 
            }
            else {
                return {success:false, message:"Failed to insert Notification Receiver"}
            }
        }
        else if(type === "user"){
            const result = await insertNotificationUser(id_notification,notificationReceiver);
            if(result){
                return {success:true, message:"Notification Receiver inserted successfully"} 
            }
            else {
                return {success:false, message:"Failed to insert Notification Receiver"}
            }
        }
        else{
            const result = await insertNotificationReceiver(id_notification,notificationReceiver);
            if(result){
                return {success:true, message:"Notification Receiver inserted successfully"} 
            }
            else {
                return {success:false, message:"Failed to insert Notification Receiver"}
            }
        }
    }catch(error:any){
        return {success:false, message:error.message}
    }
}

export async function updateStatusNotificationService(id_notification:number ,  statusNotification : any): Promise<{success: boolean; status: number, message?:string}>{
    try{
    
        const result = await markNotificationAsRead(id_notification, statusNotification);
        if(result){
            return {success: true , message: "Notification Updated Successfully", status:201}
        } else{
            return {success:false, message:"Notification not found", status:404}
        }
    } catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}

export async function countNotificationUnreadService(userId:any): Promise<{success: boolean; data?: number; message?: string; status: number}> {
    try{
        const count = await countNotificationUnread(userId);
        return {success: true, data: count, status: 200};
    } catch(e:any){
        return {success: false, message:e.message, status:500};
    }
}

export async function getAllRolesService(): Promise<{ success: boolean; data?: any[]; message?: string; status: number }> {
    try {
        const roles = await getAllRoles();
        const roleId = roles.map(role =>(role.id_role))
        return { success: true, data: roleId, status: 200 };
    } catch (e: any) {
        return { success: false, message: e.message, status: 500 };
    }
}
export async function getAllUsersService(): Promise<{ success: boolean; data?: any[]; message?: string; status: number }> {
    try {
        const users = await getAllUsers();
        const userId = users.map(user =>(user.id_user))
        return { success: true, data: userId, status: 200 };
    } catch (e: any) {
        return { success: false, message: e.message, status: 500 };
    }
}

// export async function updateStatusNotification(id_notification:number, notification:Notification): Promise<{success: boolean; status: number, message?:string}>{
//     try{
//         const result = await updateNotification(id_notification,notification);
//         if(result){
//             return {success: true , message: "Notification Updated Successfully", status:201}
//         } else{
//             return {success:false, message:"Notification not found", status:404}
//         }
//     } catch(e:any){
//         return {success:false, message:e.message, status:500}
//     }
// }


// export async function deleteNotificationService(id_notification:number): Promise<{success:boolean, status:number, message?:string}>{
//     try{
//         const result = await deleteNotification(id_notification);
//         if(result){
//             return {success:true, message:"Notification deleted successfully", status:201}
//         }else{
//             return {success:false, message:"Notification not found", status:404}
//         }
//     }catch(e:any){
//         return {success:false, message:e.message, status:500}
//     }
// }