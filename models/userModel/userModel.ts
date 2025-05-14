import { queryDatabase } from "../../lib/query";
import { RowDataPacket, ResultSetHeader } from "mysql2"; // Import MySQL types

export type User = {
    id_user: string;
    fullName: string;
    username: string;
    password: string;
    phone_number: string;
    role: string;
    confirmPassword?: any; // Optional field for confirmation
    id:any;
};

export async function getAllUsers(): Promise<User[]> {
    const result = (await queryDatabase("SELECT * FROM users WHERE deleted_at IS NULL")) as User[];
    return result;
}

// ✅ Get User by ID (Fix `.length` Error)
export async function getUserById(id: number): Promise<User | null> {
    const result = (await queryDatabase(
        "SELECT * FROM users WHERE id_user = ?", 
        [id]
    )) as RowDataPacket[];
    return result.length > 0 ? (result[0] as User) : null;
}

export async function checkUsername(username: string): Promise<User | null> {
    const result = (await queryDatabase(
        "SELECT * FROM users WHERE username = ?", 
        [username]
    )) as RowDataPacket[];
    return result.length > 0 ? (result[0] as User) : null;
}

export async function checkPassword(id:string, password: string): Promise<User | null> {
    const result = (await queryDatabase(
        "SELECT * FROM users WHERE password = ? AND id_user = ?", 
        [password, id]
    )) as RowDataPacket[];
    return result.length > 0 ? (result [0] as User) : null; 
}

// ✅ Insert User (Fix `insertId` Error)
export async function insertUser(user: User): Promise<number> {
    const { username, password, phone_number, role, fullName } = user;
    
    const result = (await queryDatabase(
        "INSERT INTO users (username, password, phone_number, role , fullName) VALUES (?, ?, ?, ?, ?)",
        [username, password, phone_number, role, fullName]
    )) as ResultSetHeader;

    return result.insertId; 
}

// ✅ Update User (Fix `affectedRows` Error)
export async function updateUser(id: number, user: User): Promise<boolean> {
    const { username, password, phone_number ,fullName } = user;

    const result = (await queryDatabase(
        "UPDATE users SET username = ?, password = ?, phone_number = ? , fullName = ? WHERE id_user = ?",
        [username, password, phone_number,fullName, id]
    )) as ResultSetHeader;

    return result.affectedRows > 0;
}

// ✅ Delete User (Fix `affectedRows` Error)
export async function deleteUser(id: number): Promise<boolean> {
    const date = new Date();
    const result = (await queryDatabase(
        "UPDATE users SET deleted_at = ? WHERE id_user = ?", 
        [date, id]
    )) as ResultSetHeader;

    return result.affectedRows > 0; 
}


export async function updateUsername(id_user : string , username: string): Promise<number>{
    const result = (await queryDatabase(
        "UPDATE users set username = ? WHERE id_user = ?",
        [username, id_user]
    )) as ResultSetHeader;
    return result.affectedRows;
}

export async function updatePassword(id_user : string , password: string): Promise<number>{
    const result = (await queryDatabase(
        "UPDATE users set password = ? WHERE id_user = ?",
        [password, id_user]
    )) as ResultSetHeader;

    return result.affectedRows; 
}

export async function updateRole(id_user : string , role: string):Promise<number>{
    const result = (await queryDatabase(
        "UPDATE users set role = ? WHERE id_user = ?",
        [role, id_user]
    )) as ResultSetHeader;

    return result.affectedRows; 
}



// export async function deleteUser(id: number): Promise<boolean> {
//     const result = (await queryDatabase(
//         "DELETE FROM users WHERE id_user = ?", 
//         [id]
//     )) as ResultSetHeader;

//     return result.affectedRows > 0; 
// }

// Information
// 1. so promise for wait function run first but not block main thread
// 2. after that  Promise<boolean> is return <boolean> type of data that can be used for response
// 3. after that in const result  there are as for result type 
// 4. after as ResultSetHeader , return result.affectedRows  match promise type of data to send to api
// so summary Function deleteUser run by promise and return type must be match with type of promise to send to api 
// const { username, password, phone_number, role } = user; it means  same with user.username, user.password, user.phone_number
// 5. use RowDataPacket[] for SELECT and use ResultSetHeader for INSERT, UPDATE, DELETE
