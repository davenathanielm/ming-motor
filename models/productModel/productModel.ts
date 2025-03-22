import { queryDatabase } from "../../lib/query";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export type Product = {
    name: string;
    qty: number;
    brand: string;
    hpp: number;
    selling_price: number;
    barcode: string;
    description:string
    image: string;
    status: string;
    id_category: number;
}

export async function getAllProduct(): Promise<Product[]> {
    const result = (await queryDatabase("SELECT * FROM product")) as Product[]
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

export async function deleteProduct(id: number): Promise<boolean> {
    const result = (await queryDatabase(
        "DELETE FROM product WHERE id_product = ?", 
        [id]
    )) as ResultSetHeader;

    return result.affectedRows > 0; 
}