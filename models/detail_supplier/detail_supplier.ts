import { queryDatabase } from "../../lib/query";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export type DetailSupplier = {
    id_product : number;
    id_supplier : number;
    qty : number;
    hpp : number;
    total_qty:number;
}

export type SupplierSummary = {
    id_detail_supplier : number;
    barcode : string;
    name : string;
    supplier_name : string;
    phone_number : string;
    city : string;
    qty : number;
    total_qty : number;
    hpp : number;
    created_at : Date;
    updated_at : Date;
    description : string;
}

export async function getAllDetailSupplier(): Promise<DetailSupplier[]> {
    const result = (await queryDatabase("SELECT * FROM detail_supplier")) as DetailSupplier[];
    return result;
}

export async function insertDetailSupplier(detailSupplier:DetailSupplier): Promise<number>{
    const {id_product,id_supplier,qty,total_qty,hpp} = detailSupplier;
    const result = (await queryDatabase("INSERT INTO detail_supplier (id_product,id_supplier,qty,total_qty,hpp) VALUES (?,?,?,?,?)",[id_product,id_supplier,qty,total_qty,hpp]
    )) as ResultSetHeader;
    return result.insertId;
}

export async function updateDetailSupplier(DetailSupplier:DetailSupplier): Promise<boolean>{
    const {id_product,id_supplier} = DetailSupplier;
    const result = (await queryDatabase("UPDATE detail_supplier SET id_supplier = ? WHERE id_product = ?",[id_supplier, id_product]
    )) as ResultSetHeader;
    return result.affectedRows > 0;
}

export async function deleteDetailSupplier(id:number): Promise<boolean>{
    const result = (await queryDatabase("DELETE FROM detail_supplier WHERE id_detail_supplier =?",[id]
    )) as ResultSetHeader;
    return result.affectedRows > 0;
}

export async function getSupplierSummary(): Promise<SupplierSummary[]> {
    const query = `
        SELECT 
            a.id_detail_supplier, 
            b.barcode, 
            b.name, 
            c.supplier_name, 
            c.phone_number, 
            c.city, 
            a.qty, 
            a.total_qty,
            a.hpp, 
            a.created_at, 
            c.updated_at, 
            b.description 
        FROM detail_supplier a 
        INNER JOIN product b ON a.id_product = b.id_product 
        INNER JOIN supplier c ON a.id_supplier = c.id_supplier
    `;

    const result = (await queryDatabase(query)) as SupplierSummary[];
    return result;
}



// information
// ini buat manggil product dan suppliernya

