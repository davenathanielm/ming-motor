import { queryDatabase } from "../../lib/query";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export type DetailWarehouse = {
    id_product : number;
    id_inventory : number;
    movement_type : string;
    qty : number;
}

export type InventorySummary = {
    id_inventory : number;
    id_detail_warehouse : number;
    name : string;
    barcode : string;
    qty : number;
    movement_type : string;
    location : string;
    created_at : Date;
    updated_at : Date;
    description : string;
}

export async function getAllDetailWarehouse(): Promise<DetailWarehouse[]> {
    const result = (await queryDatabase("SELECT * FROM detail_warehouse")) as DetailWarehouse[];
    return result;
}

export async function insertDetailWarehouse(detailWarehouse:DetailWarehouse): Promise<number>{
    const {id_product,id_inventory,movement_type,qty} = detailWarehouse;
    const result = (await queryDatabase("INSERT INTO detail_warehouse (id_product,id_inventory,movement_type,qty) VALUES (?,?,?,?)",[id_product,id_inventory,movement_type,qty]
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

export async function getInventorySummary(): Promise<InventorySummary[]> {
    const query = `
        SELECT 
            a.id_inventory,
            a.id_detail_warehouse, 
            c.name, 
            c.barcode, 
            a.qty, 
            a.movement_type, 
            b.location, 
            a.created_at,
            c.updated_at, 
            b.description  
        FROM detail_warehouse a 
        INNER JOIN inventory b ON a.id_inventory = b.id_inventory 
        INNER JOIN product c ON a.id_product = c.id_product
    `;

    const result = (await queryDatabase(query)) as InventorySummary[];
    return result;
}
 


// information
// ini buat manggil product dan suppliernya

