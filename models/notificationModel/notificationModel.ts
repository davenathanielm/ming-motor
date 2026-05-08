import { queryDatabase } from "../../lib/query";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export type Notification = {
    id_notification ?: any;
    id_user ?: any;
    type ?: string;
    message ?: string;
    action ?: string;
    entity_name ?: string;
    table_name ?: string;
    date ?: any;
    fullName ?: any;
}

export type NotificationUser = {
    id_notification_user : any;
    id_notification : any;
    id_user: any;
    is_read : boolean;
    triggered_by : any;
    created_at: any;
}   

export type NotificationReceiver = {
    id_notification_receiver ?: any;
    id_notification ?: any;
    id_receiver : any;
    created_at ?: any;
    notification_type : string;
}

export async function getAllNotification(
  userId: number,
  roleId : any,
  page: number,
  limit: number,
  status?: string // optional
): Promise<Notification[]> {
  const offset = (page - 1) * limit;

  let query = `
   SELECT  
    n.id_notification,
    n.type,
    n.message,
    n.action,
    n.entity_name,
    n.table_name,
    n.created_at AS 'date',
    creator.fullName
FROM notification n
INNER JOIN users creator ON creator.id_user = n.id_user
WHERE n.id_notification IN (

    SELECT nu.id_notification
    FROM notification_user nu
    WHERE nu.id_user = ?

    UNION

  
    SELECT nr.id_notification
    FROM notification_role nr
    WHERE nr.id_role = (SELECT id_role FROM users WHERE id_user = ?)
)
ORDER BY n.created_at DESC
  `;

  const params: any[] = [userId , userId];

  // if (typeof status !== "undefined") {
  //   query += ` AND n.is_read = ?`;
  //   params.push(status);
  // }

  query += ` LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  const result = (await queryDatabase(query, params)) as Notification[];
  return result;
}
// export async function getAllNotification(
//   userId: number,
//   page: number,
//   limit: number,
//   status?: string // optional
// ): Promise<Notification[]> {
//   const offset = (page - 1) * limit;

//   let query = `
//    SELECT 
//  	    n.id_notification,
//       n.type,
//       n.message,
//       n.action,
//       n.entity_name,
//       n.table_name,
//       n.created_at AS 'date',
//       u.fullName
//     FROM notification n
//     INNER JOIN users u ON u.id_user = n.id_user
//     WHERE n.id_user = ?
//     ORDER BY n.created_at DESC
//   `;

//   const params: any[] = [userId];

//   if (typeof status !== "undefined") {
//     query += ` AND n.is_read = ?`;
//     params.push(status);
//   }

//   query += ` LIMIT ? OFFSET ?`;
//   params.push(limit, offset);

//   const result = (await queryDatabase(query, params)) as Notification[];
//   return result;
// }


// export async function getAllNotification(userId: number, page: number, limit: number , status : string) : Promise<Notification[]> {
//     const offset = (page - 1) * limit;
//     const result = (await queryDatabase(
//                     "SELECT n.id_notification , b.type, b.message, b.action, b.entity_name, b.table_name, b.created_at AS 'date', n.is_read AS 'status' FROM `notification_user` n INNER JOIN notification b ON n.id_notification = b.id_notification WHERE n.id_user = ? AND n.is_read = ? LIMIT ? OFFSET ?",
//                     [userId, status, limit, offset]
//                 )) as Notification[];
//     return result;
// }

export async function markNotificationAsRead(id_notification: number, status : string): Promise<boolean> {
    const result = (await queryDatabase("UPDATE notification_user SET is_read = ? WHERE id_notification_user = ?", [status, id_notification]
    )) as ResultSetHeader;
    return result.affectedRows > 0;
}

export async function insertNotification( notification: Notification): Promise<number>{
    const {type , message, action, entity_name, table_name, id_user} = notification
    const result = (await queryDatabase("INSERT INTO notification (type,message,action,entity_name,table_name,id_user) VALUES (?,?,?,?,?,?)",[type, message, action, entity_name, table_name, id_user]     
    )) as ResultSetHeader;
    return result.insertId;
}

export async function insertUserNotification( userNotification: NotificationUser): Promise<number>{
    const {id_notification, id_user, triggered_by} = userNotification
    const result = (await queryDatabase("INSERT INTO notification_user (id_notification, id_user, triggered_by) VALUES (?,?,?)",[id_notification, id_user, triggered_by]     
    )) as ResultSetHeader;
    return result.insertId;
}

// export async function insertNotificationReceiver( notificationreceiver : NotificationReceiver): Promise<number>{
//     const {id_notification, id_receiver, notification_type} = notificationreceiver
//     const result = (await queryDatabase("INSERT INTO notification_receiver (id_notification, id_receiver, notification_type) VALUES (?,?,?)",[id_notification, id_receiver, notification_type]     
//     )) as ResultSetHeader;
//     return result.insertId;
// }

export async function insertNotificationReceiver( id_notification : any ,  notificationReceiver: NotificationReceiver[]) : Promise<number> {
  if (notificationReceiver.length === 0 || !id_notification) {
    return 0; // No receivers to insert
  }
  const placeholders = notificationReceiver.map(()=>"(?,?,?)").join(","); //join turn array into string so sql can read it, also divided using ','
  const params : any[] = notificationReceiver.flatMap((receiver) =>[id_notification , receiver.notification_type ,receiver.id_receiver ])
  const sql = `INSERT INTO notification_receiver (id_notification, notification_type, id_receiver) VALUES ${placeholders}`;
  const result = (await queryDatabase(sql, params)) as ResultSetHeader;
  return result.insertId;
}

export async function insertNotificationRole( id_notification : any ,  notificationRole: NotificationReceiver[]) : Promise<number> {
  if (notificationRole.length === 0 || !id_notification) {
    return 0; // No receivers to insert
  }
  const placeholders = notificationRole.map(()=>"(?,?)").join(","); //join turn array into string so sql can read it, also divided using ','
  const params : any[] = notificationRole.flatMap((receiver) =>[id_notification,receiver.id_receiver ])
  const sql = `INSERT INTO notification_role (id_notification, id_role) VALUES ${placeholders}`;
  const result = (await queryDatabase(sql, params)) as ResultSetHeader;
  return result.insertId;
}

export async function insertNotificationUser( id_notification : any ,  notificationUser: NotificationReceiver[]) : Promise<number> {
  if (notificationUser.length === 0 || !id_notification) {
    return 0; // No receivers to insert
  }
  const placeholders = notificationUser.map(()=>"(?,?)").join(","); //join turn array into string so sql can read it, also divided using ','
  const params : any[] = notificationUser.flatMap((receiver) =>[id_notification,receiver.id_receiver ])
  const sql = `INSERT INTO notification_user (id_notification, id_user) VALUES ${placeholders}`;
  const result = (await queryDatabase(sql, params)) as ResultSetHeader;
  return result.insertId;
}


export async function countNotificationUnread(userId:any): Promise<number> {
  const result = (await queryDatabase("SELECT COUNT(*) as count FROM notification WHERE created_at > (SELECT last_notification_seen FROM users WHERE id_user = ?)", 
                  [userId])) as RowDataPacket;
  return result[0].count;
  // it will return number exactly like 5 because i use .count, if i change as hitung, then the result should be result[0].hitung
}

export async function getAllRoles(): Promise<any[]>{
    const result = (await queryDatabase("SELECT id_role FROM `roles`;")) as any[];
    return result;
}

export async function getAllUsers(): Promise<any[]>{
    const result = (await queryDatabase("SELECT id_user FROM `users`;")) as any[];
    return result;
}




// export async function getAllNotification(): Promise<Notification[]> {
//     const result = (await queryDatabase("SELECT * FROM notification")) as Notification[];
//     return result; 
// }

// export async function getAllNotificationPagination(userId: number, page: number = 1, limit: number = 10){
//     const offset = (page - 1) * limit;
//     const result = (await queryDatabase(
//                     "SELECT * FROM notification WHERE id_user = ? LIMIT ? OFFSET ?",
//                     [userId, limit, offset]
//                 )) as Notification[];
//     return result;
// }


// export async function updateNotification(id:number , notification:Notification): Promise<boolean> {
//     const {type, message, action, entity_name, table_name} = notification
//     const result = (await queryDatabase("UPDATE notification SET type = ?, message = ?, action = ?, table_name = ?, entity_name = ? WHERE id_notification = ? ", [type,message,action,table_name,entity_name, id]) as ResultSetHeader)
//     return result.affectedRows > 0;
// }

export async function getNotificationById(id:number): Promise<Notification | null> {
    const result = (await queryDatabase("SELECT * from notification WHERE id_notification = ?",[id]
    )) as RowDataPacket[];
    return result.length > 0 ? (result[0] as Notification) : null;
}



// besok ganti ini

// SELECT  
//     t.id_receiver,
//     n.id_notification,
//     n.type,
//     n.message,
//     n.action,
//     n.entity_name,
//     n.table_name,
//     n.created_at AS `date`,
//     creator.fullName,
//     t.id_receiver
// FROM notification n
// INNER JOIN users creator ON creator.id_user = n.id_user   -- who created the notification
// INNER JOIN notification_receiver t ON t.id_notification = n.id_notification
// INNER JOIN users us ON t.id_receiver = us.id_role AND t.notification_type = 'role'
// WHERE us.id_role = 1
// ORDER BY n.created_at DESC 
// LIMIT 0, 25;