import { queryDatabase } from "../../lib/query";
import { RowDataPacket,ResultSetHeader } from "mysql2";

export type Inventory = {
    location : string;
    description : string;
};

export async function getAllInventory(): Promise<Inventory[]> {
    const result = (await queryDatabase("SELECT * FROM inventory")) as Inventory[];
    return result;
}

export async function getInventoryById(id:number): Promise<Inventory | null> {
    const result = (await queryDatabase("SELECT * FROM inventory WHERE id_inventory = ?",[id])) as RowDataPacket[];
    return result.length > 0 ? (result[0] as Inventory) : null;
}

export async function insertInventory(inventory:Inventory): Promise<number>{
    const {location, description} = inventory
    const result = (await queryDatabase("INSERT INTO inventory (location, description) VALUES (?,?)",[location, description])) as ResultSetHeader;

    return result.insertId;
}

export async function updateInventory(id:number, inventory:Inventory): Promise<boolean> {
    const {location, description} = inventory

    const result = (await queryDatabase("UPDATE inventory SET location = ?, description = ? WHERE id_inventory = ?",
         [location, description, id]
        )) as ResultSetHeader;
    return result.affectedRows > 0;
}

export async function deleteInventory(id:number): Promise<boolean> {
    const result = (await queryDatabase("DELETE FROM inventory WHERE id_inventory = ?", [id])) as ResultSetHeader;
    return result.affectedRows > 0;
}