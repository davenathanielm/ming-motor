import { queryDatabase } from "../../lib/query";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export type Category = {
    category_name: string;
    description : string;
};

export async function getAllCategory(): Promise<Category[]> {
    const result = (await queryDatabase("SELECT * FROM category")) as Category[];
    return result;
}

export async function getCategoryById(id: number): Promise<Category | null> {
    const result = (await queryDatabase(
        "SELECT * FROM category WHERE id_category = ?", 
        [id]
    )) as RowDataPacket[];
    return result.length > 0 ? (result[0] as Category) : null;
}

export async function insertCategory(category: Category): Promise<number> {
    const { category_name, description } = category;
    
    const result = (await queryDatabase(
        "INSERT INTO category (category_name, description) VALUES (?, ?)",
        [category_name, description]
    )) as ResultSetHeader;

    return result.insertId; 
}

export async function updateCategory(id: number, category: Category): Promise<boolean> {
    const { category_name, description } = category;

    const result = (await queryDatabase(
        "UPDATE category SET category_name = ?, description = ? WHERE id_category = ?",
        [category_name, description, id]
    )) as ResultSetHeader;

    return result.affectedRows > 0;
}

export async function deleteCategory(id: number): Promise<boolean> {
    const result = (await queryDatabase(
        "DELETE FROM category WHERE id_category = ?", 
        [id]
    )) as ResultSetHeader;

    return result.affectedRows > 0;
}