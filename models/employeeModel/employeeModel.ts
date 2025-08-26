import { queryDatabase } from "../../lib/query";
import { RowDataPacket , ResultSetHeader } from "mysql2";

export type Employee = {
    full_name ?: string;
    phone ?: string;
    address ?: string;
    position ?: string;
    id_user ?: any;
    join_date ?: any;
    created_at ?: any;
    updated_at ?: any;
    deleted_at ?: any;
    image_url ?: string;
    id ?: any;
};

export async function getAllEmployee() : Promise<Employee[]>{
    const result = (await queryDatabase("SELECT * FROM employees WHERE deleted_at IS NULL")) as Employee[];
    return result;
}

export async function getEmployeeById(id_employee:any) : Promise <Employee | null>{
    const result = (await queryDatabase(
        "SELECT * FROM `employees` WHERE  id = ?",
        [id_employee]
    )) as RowDataPacket[];
    return result.length > 0 ? (result[0] as Employee) : null;
}

export async function insertEmployee(employee: Employee) : Promise <number>{
    const { full_name, phone, address, position, id_user, join_date,image_url } = employee;

    const result = (await queryDatabase(
        "INSERT INTO employees (full_name, phone, address, position, join_date) VALUES (?, ?, ?, ?, ? )",
        [full_name, phone, address, position, join_date]
    )) as ResultSetHeader;

    return result.insertId;
}

export async function insertEmployeeWithUser(employee: Employee) : Promise <number>{
    const { full_name, phone, position, id_user , join_date } = employee;
    const join_date_curently = new Date(join_date)

    const result = (await queryDatabase(
        "INSERT INTO employees (full_name, phone, position, id_user) VALUES (?, ?, ?, ?)",
        [full_name, phone, position, id_user ]
    )) as ResultSetHeader;

    return result.insertId;
}

export async function updateEmployee (id: number , employee: Employee) : Promise <boolean>{
    const { full_name, phone, address, position, id_user, join_date, image_url } = employee;

    const result = (await queryDatabase(
        "UPDATE employees SET full_name = ?, phone = ?, address = ?, position = ?, join_date = ?, image_url = ? WHERE id = ?",
        [full_name, phone, address, position, join_date, image_url, id]
    )) as ResultSetHeader;

    return result.affectedRows > 0;
}

export async function deleteEmployee(id: number) : Promise <boolean>{
    const date = new Date();
    const result = (await queryDatabase(
        "UPDATE employees SET deleted_at = ? WHERE id = ?",
        [date, id]
    )) as ResultSetHeader;

    return result.affectedRows > 0;
}

export async function countEmployees(): Promise<Employee | null>{
    const result = (await queryDatabase(
        "SELECT COUNT(*) AS value FROM employees"
    )) as RowDataPacket[];
    return result.length > 0 ? (result[0] as Employee) : null;
}