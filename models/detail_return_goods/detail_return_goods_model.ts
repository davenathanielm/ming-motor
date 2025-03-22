import { queryDatabase } from "../../lib/query";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export type DetailReturn = {
    id_product : number;
    id_return : number;
}

export async function getAllDetailReturn(): Promise<DetailReturn[]> {
    const result = (await queryDatabase("SELECT * FROM detail_return_goods")) as DetailReturn[];
    return result;
}

export async function insertDetailReturn(detailReturn:DetailReturn): Promise<number>{
    const {id_product,id_return} = detailReturn;
    const result = (await queryDatabase("INSERT INTO detail_return_goods (id_product,id_return) VALUES (?,?)",[id_product,id_return]
    )) as ResultSetHeader;
    return result.insertId;
}

export async function updateDetailReturn(id:number,detailReturn:DetailReturn): Promise<boolean>{
    const {id_product,id_return} = detailReturn;
    const result = (await queryDatabase("UPDATE detail_return_goods SET id_product = ?,id_return = ? WHERE id_warehouse = ?",[id_product,id_return, id]
    )) as ResultSetHeader;
    return result.affectedRows > 0;
}

export async function deleteDetailReturn(id:number): Promise<boolean>{
    const result = (await queryDatabase("DELETE FROM detail_return_goods WHERE id_detail_return_goods =?",[id]
    )) as ResultSetHeader;
    return result.affectedRows > 0;
}

// information
// ini buat manggil product dan suppliernya

