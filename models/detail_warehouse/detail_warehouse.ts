import { queryDatabase } from "../../lib/query";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export type DetailWarehouse = {
    id_product : number;
    id_inventory : number;
}

export async function getAllDetailWarehouse(): Promise<DetailWarehouse[]> {
    const result = (await queryDatabase("SELECT * FROM detail_warehouse")) as DetailWarehouse[];
    return result;
}

export async function insertDetailWarehouse(detailWarehouse:DetailWarehouse): Promise<number>{
    const {id_product,id_inventory} = detailWarehouse;
    const result = (await queryDatabase("INSERT INTO detail_warehouse (id_product,id_inventory) VALUES (?,?)",[id_product,id_inventory]
    )) as ResultSetHeader;
    return result.insertId;
}

export async function updateDetailWarehouse(detailWarehouse:DetailWarehouse): Promise<boolean>{
    const {id_product,id_inventory} = detailWarehouse;
    const result = (await queryDatabase("UPDATE detail_warehouse SET id_inventory = ? WHERE id_product = ?",
        [id_inventory,id_product]
    )) as ResultSetHeader;
    return result.affectedRows > 0;
}
// export async function updateDetailWarehouse(id:number,detailWarehouse:DetailWarehouse): Promise<boolean>{
//     const {id_product,id_inventory} = detailWarehouse;
//     const result = (await queryDatabase("UPDATE detail_warehouse SET id_product = ?,id_inventory = ? WHERE id_warehouse = ?",
//         [id_product,id_inventory, id]
//     )) as ResultSetHeader;
//     return result.affectedRows > 0;
// }

export async function deleteDetailWarehouse(id:number): Promise<boolean>{
    const result = (await queryDatabase("DELETE FROM detail_warehouse WHERE id_detail_warehouse =?",[id]
    )) as ResultSetHeader;
    return result.affectedRows > 0;
}


// information
// ini buat manggil product dan suppliernya

