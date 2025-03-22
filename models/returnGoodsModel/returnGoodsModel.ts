import { queryDatabase } from "../../lib/query";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export type ReturnGoods = {
    reason : string;
    refund_status: string;
    qty_return : number;
}

export async function getAllReturnGoodsModel(): Promise<ReturnGoods[]> {
    const result = (await queryDatabase("SELECT * FROM return_goods")) as ReturnGoods[];
    return result;
}

export async function insertReturnGoodsModel(returnGoods:ReturnGoods): Promise<number> {
    const {reason , refund_status, qty_return} = returnGoods
    const result = (await queryDatabase("INSERT INTO return_goods (reason, refund_status, qty_return) VALUES(?, ?, ?)", [reason, refund_status,qty_return]
    )) as ResultSetHeader;

   return result.insertId; 
}

export async function getReturnGoodsByIdModel(id:number): Promise<ReturnGoods | null> {
 const result = (await queryDatabase("SELECT * FROM return_goods WHERE id_return = ?", [id])) as RowDataPacket[];   
 return result.length > 0? (result[0] as ReturnGoods): null;
}

export async function updateReturnGoodsModel(id:number, returnGoods: ReturnGoods) {
    const {reason, refund_status, qty_return} = returnGoods
    const result = (await queryDatabase(
        "UPDATE return_goods SET reason = ?, refund_status = ?, qty_return = ? WHERE id_return = ?", 
        [reason,refund_status,qty_return,id])) as ResultSetHeader;

    return result.affectedRows > 0;
}

export async function deleteReturnGoodsModel(id: number): Promise<boolean>{
    const result = (await queryDatabase("DELETE FROM return_goods WHERE id_return = ?",[id])) as ResultSetHeader;
    return result.affectedRows > 0 ; 
}