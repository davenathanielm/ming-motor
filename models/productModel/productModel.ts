import { queryDatabase } from "../../lib/query";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export type Product = {
    name: string;
    qty: number;
    total_qty:number;
    brand: string;
    hpp: number;
    selling_price: number;
    barcode: string;
    description:string
    image: string;
    status: string;
    id_category: number;
    id_product: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date; 
}

export type Barcode = {
    barcode : string;
}

export type UpdateQtyData = {
    qty: number;
    id_supplier: number;
    id_inventory: number;
    hpp: number;
}

export async function getAllProduct(): Promise<Product[]> {
    const result = (await queryDatabase("SELECT * FROM product WHERE deleted_at IS NULL")) as Product[]
    return result;
}

export async function getCategoryByProduct() : Promise<{category_name : string}[]>{
    const result = (await queryDatabase("SELECT b.category_name FROM product a INNER JOIN category b ON a.id_category = b.id_category"
    )) as {category_name : string}[]
    return result;
}

export async function getProductById(id:number) : Promise<Product | null>{
    const result = (await queryDatabase("SELECT * FROM product WHERE id_product = ?", [id]  
    )) as RowDataPacket;
    return result.length > 0 ? (result[0] as Product):null;
}

export async function searchBarcodeProduct(barcode : string): Promise<Product | null>{
    const result = (await queryDatabase(
        "SELECT * FROM product WHERE barcode = ?",
         [barcode]  
    )) as RowDataPacket;

    return result.length > 0 ? (result[0] as Product):null;
}

export async function insertProduct(product: Product): Promise<number> {
    const { name, qty, brand, hpp, selling_price,barcode,description,image, status,id_category} = product;
    const result = (await queryDatabase("INSERT INTO product (name, qty, brand, hpp, selling_price, barcode, description, image, status, id_category) VALUES (?,?,?,?,?,?,?,?,?,?)", [name, qty, brand, hpp, selling_price,barcode,description,image, status,id_category]
    )) as ResultSetHeader;

    return result.insertId;
}

export async function updateProduct(id:number, product: Product) : Promise<boolean>{
    const { name, qty, brand, hpp, selling_price,barcode,description,image, status,id_category} = product;
    const result = (await queryDatabase("UPDATE product SET name = ?, qty = ?, brand = ? , hpp = ?, selling_price = ?, barcode = ?, description = ? , image = ?, status = ?, id_category = ? WHERE id_product = ?" , 
        [name, qty, brand, hpp, selling_price,barcode,description,image, status,id_category , id]
    ))as ResultSetHeader;
    return result.affectedRows > 0;
}

export async function updateQtyProduct(id:number, qty: number) : Promise<boolean>{
    const result = (await queryDatabase("UPDATE product SET  qty = ? WHERE id_product = ?" , 
        [qty , id]
    ))as ResultSetHeader;
    return result.affectedRows > 0;
}

export async function deleteProduct(id: number): Promise<boolean> {
    const date = new Date();
    const result = (await queryDatabase(
        "UPDATE product SET deleted_at = ? WHERE id_product = ?", 
        [date, id]
    )) as ResultSetHeader;

    return result.affectedRows > 0; 
}