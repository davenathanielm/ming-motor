import { getAllNotification, getNotificationById , insertNotification, updateNotification,deleteNotification, Notification } from "../models/notificationModel/notificationModel";

export async function getAllNotificationService(): Promise<{ success: boolean; data?: Notification[]; message?: string }> {
    try {
        const notification = await getAllNotification();
        return {success: true, data: notification}; 
    } catch (error: any) {
        return {success: false, message: error.message}; 
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

export async function insertNotificationService(notification:Notification) : Promise<{success: boolean; data?:Notification; message?:string}>{
    try{
        const result = await insertNotification(notification);
        return {success:true, message:"Notification inserted successfully"}
    }catch(error:any){
        return {success:false, message:error.message}
    }
}

export async function updateNotificationService(id_notification:number, notification:Notification): Promise<{success: boolean; status: number, message?:string}>{
    try{
        const result = await updateNotification(id_notification,notification);
        if(result){
            return {success: true , message: "Notification Updated Successfully", status:201}
        } else{
            return {success:false, message:"Notification not found", status:404}
        }
    } catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}

export async function deleteNotificationService(id_notification:number): Promise<{success:boolean, status:number, message?:string}>{
    try{
        const result = await deleteNotification(id_notification);
        if(result){
            return {success:true, message:"Notification deleted successfully", status:201}
        }else{
            return {success:false, message:"Notification not found", status:404}
        }
    }catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}