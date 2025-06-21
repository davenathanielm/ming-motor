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

export interface ProductTransaction {
    id_product: number;
    qty: number;
}

export async function getAllProductByOwner(): Promise<Product[]> {
    const result = (await queryDatabase("SELECT a.id_product, a.name ,b.category_name,a.qty, a.brand, a.hpp,a.selling_price, a.barcode, a.description, a.image, a.status, a.id_category, a.created_at, a.updated_at, a.deleted_at FROM product a INNER JOIN category b ON (a.id_category = b.id_category) where a.deleted_at is NULL;")) as Product[]
    return result;
}

export async function getAllProduct(): Promise<Product[]> {
    const result = (await queryDatabase("SELECT a.id_product, a.name ,b.category_name,a.qty, a.brand,a.selling_price, a.barcode, a.description, a.image, a.status, a.id_category, a.created_at, a.updated_at, a.deleted_at FROM product a INNER JOIN category b ON (a.id_category = b.id_category) where a.deleted_at is NULL;")) as Product[]
    return result;
}

export async function getCategoryByProduct() : Promise<{category_name : string}[]>{
    const result = (await queryDatabase("SELECT b.category_name FROM product a INNER JOIN category b ON a.id_category = b.id_category"
    )) as {category_name : string}[]
    return result;
}

export async function getProductByIdOwner(id:number) : Promise<Product | null>{
    const result = (await queryDatabase("SELECT * FROM product WHERE id_product = ?", [id]  
    )) as RowDataPacket;
    return result.length > 0 ? (result[0] as Product):null;
}

export async function getProductById(id:number) : Promise<Product | null>{
    const result = (await queryDatabase("SELECT id_product, name, qty, brand, selling_price, barcode, description , image, status, id_category, created_at, updated_at , deleted_at FROM `product` WHERE deleted_at IS NULL and id_product = ?;", [id]  
    )) as RowDataPacket;
    return result.length > 0 ? (result[0] as Product):null;
}

export async function searchBarcodeProductByOwner(barcode : string): Promise<Product | null>{
    const result = (await queryDatabase(
        "SELECT * FROM product WHERE barcode = ?",
         [barcode]  
    )) as RowDataPacket;

    return result.length > 0 ? (result[0] as Product):null;
}

export async function searchBarcodeProduct(barcode : string): Promise<Product | null>{
    const result = (await queryDatabase(
        "SELECT id_product, name, qty, brand, selling_price, barcode, description , image, status, id_category, created_at, updated_at , deleted_at FROM product WHERE barcode = ?",
         [barcode]  
    )) as RowDataPacket;

    return result.length > 0 ? (result[0] as Product):null;
}

export async function fetchAllBarcode(): Promise<Product[]>{
    const result = (await queryDatabase(
        "SELECT barcode,selling_price,qty,id_product,name FROM product WHERE deleted_at IS NULL", 
    )) as Product[];

    return result;
}

export async function insertProduct(product: Product): Promise<number> {
    const { name, qty, brand, hpp, selling_price,barcode,description,image, status,id_category} = product;
    const result = (await queryDatabase("INSERT INTO product (name, qty, brand, hpp, selling_price, barcode, description, image, status, id_category) VALUES (?,?,?,?,?,?,?,?,?,?)", [name, qty, brand, hpp, selling_price,barcode,description,image, status,id_category]
    )) as ResultSetHeader;

    return result.insertId;
}

export async function updateProduct(id:number, product: Product) : Promise<boolean>{
    const { name, qty, brand, hpp, selling_price,barcode,description,image, status,id_category} = product;
    const result = (await queryDatabase("UPDATE product SET name = ?, qty = ?, brand = ? , selling_price = ?, barcode = ?, description = ? , image = ?, status = ?, id_category = ? WHERE id_product = ?" , 
        [name, qty, brand, selling_price,barcode,description,image, status,id_category , id]
    ))as ResultSetHeader;
    return result.affectedRows > 0;
}

export async function updateProductOwner(id:number, product: Product) : Promise<boolean>{
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

export async function updateStatus (id : any , status : string) : Promise<boolean>{
    const result = (await queryDatabase("UPDATE product SET status = ? WHERE id_product = ? and deleted_at IS NULL" ,
        [status , id]
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

export async function sumQtyProduct(): Promise<Product | null> {
    const result = (await queryDatabase(
        "SELECT SUM(qty) AS value FROM detail_supplier WHERE created_at >= CURDATE() AND created_at < CURDATE() + INTERVAL 1 DAY"
    )) as RowDataPacket[];
    return result.length > 0 ? (result[0] as Product): null;
}

export async function sumBuyProduct(): Promise<Product | null> {
    const result = (await queryDatabase(
        "SELECT SUM(hpp) AS value FROM detail_supplier WHERE created_at >= CURDATE() AND created_at < CURDATE() + INTERVAL 1 DAY"
    )) as RowDataPacket[];
    return result.length > 0 ? (result[0] as Product): null;
}