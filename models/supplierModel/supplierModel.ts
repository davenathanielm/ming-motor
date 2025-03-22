import { queryDatabase } from "../../lib/query";
import { RowDataPacket, ResultSetHeader } from "mysql2"; // Import MySQL types

export type Supplier = {
    supplier_name : string;
    phone_number : string;
    city : string;
    comment : string;
};

export async function getAllSupplier(): Promise<Supplier[]>{
    const result = (await queryDatabase("SELECT * FROM supplier")) as Supplier[]
    return result; 
}

export async function getSupplierById(id_supplier:number) : Promise<Supplier | null>{
    const result = (await queryDatabase("SELECT * FROM supplier WHERE id_supplier = ?",[id_supplier])) as RowDataPacket[];
    return result.length > 0 ?(result[0] as Supplier) : null;
}

export async function insertSupplier(supplier :Supplier) : Promise<number>{
    const {supplier_name,phone_number,city,comment} = supplier;

    const result = (await queryDatabase(
        "INSERT INTO supplier (supplier_name, phone_number, city, comment) VALUES(?,?,?,?)", 
        [supplier_name,phone_number,city,comment] 
    )) as ResultSetHeader

    return result.insertId
}

export async function updateSupplier(id_supplier:number, supplier :Supplier) : Promise<boolean>{
    const {supplier_name,phone_number,city,comment} = supplier;

    const result = (await queryDatabase(
        "UPDATE supplier SET supplier_name = ? , phone_number = ?, city = ?, comment = ? WHERE id_supplier = ?", 
        [supplier_name,phone_number,city,comment,id_supplier] 
    )) as ResultSetHeader

    return result.affectedRows > 0;
}

export async function deleteSupplier(id_supplier:number) : Promise<boolean>{
    const result = (await queryDatabase("DELETE FROM supplier WHERE id_supplier = ?",[id_supplier])) as ResultSetHeader;
    return result.affectedRows > 0;
}