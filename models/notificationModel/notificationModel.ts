import { stat } from "fs";
import { queryDatabase } from "../../lib/query";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export type Notification = {
    type : string;
    message: string;
    status : string;
    action : string;
    entity_name:string;
    table_name: string;
}

export async function getAllNotification(): Promise<Notification[]> {
    const result = (await queryDatabase("SELECT * FROM notification")) as Notification[];
    return result; 
}

export async function getNotificationById(id:number): Promise<Notification | null> {
    const result = (await queryDatabase("SELECT * from notification WHERE id_notification = ?",[id]
    )) as RowDataPacket[];
    return result.length > 0 ? (result[0] as Notification) : null;
}

export async function insertNotification( notification: Notification): Promise<number>{
    const {type , message, status, action, entity_name, table_name} = notification
    const result = (await queryDatabase("INSERT INTO notification (type,message,status,action,entity_name,table_name) VALUES (?,?,?,?,?,?)",[type, message, status, action, entity_name, table_name]     
    )) as ResultSetHeader;

    return result.insertId;
}

export async function updateNotification(id:number , notification:Notification): Promise<boolean> {
    const {type, message, status, action, entity_name, table_name} = notification

    const result = (await queryDatabase("UPDATE notification SET type = ?, message = ?, status = ?, action = ?, table_name = ?, entity_name = ? WHERE id_notification = ? ", [type,message,status,action,table_name,entity_name, id]) as ResultSetHeader)
    return result.affectedRows > 0;
}

export async function deleteNotification(id:number): Promise<boolean>{
    const result = (await queryDatabase("DELETE FROM notification WHERE id_notification = ?", [id]))as ResultSetHeader;
    return result.affectedRows>0;
}