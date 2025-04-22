import { queryDatabase } from "../../lib/query";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export type DetailSupplier = {
    id_product : number;
    id_supplier : number;
}

export async function getAllDetailSupplier(): Promise<DetailSupplier[]> {
    const result = (await queryDatabase("SELECT * FROM detail_supplier")) as DetailSupplier[];
    return result;
}

export async function insertDetailSupplier(detailSupplier:DetailSupplier): Promise<number>{
    const {id_product,id_supplier} = detailSupplier;
    const result = (await queryDatabase("INSERT INTO detail_supplier (id_product,id_supplier) VALUES (?,?)",[id_product,id_supplier]
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

// information
// ini buat manggil product dan suppliernya

