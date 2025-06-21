import { queryDatabase } from "../../lib/query";
import { RowDataPacket , ResultSetHeader } from "mysql2";

export type Transaction = {
    id_transaction: number;
    invoice_number:string;
    total_price: number;
    total_amount: number;
    payment_method: string;
    transaction_date: Date;
    created_at: Date;
    updated_at: Date;
    // id_user: number;
    // id_customer: number;
}

export type Transaction_items = {
    id_transaction_items: number;
    id_transaction: number;
    id_product: number;
    barcode : string;
    product_name : string;
    qty: number;
    selling_price: number;
    subtotal: number;
}

export async function getAllTransaction(): Promise<Transaction[]> {
    const result = (await queryDatabase("SELECT * FROM transactions")) as Transaction[];
    return result;
}

export async function getAllTransactionToday(): Promise<Transaction[]> {
    const date = new Date();
    const result = (await queryDatabase("SELECT * FROM transactions WHERE created_at >= CURDATE() AND created_at < CURDATE() + INTERVAL 1 DAY")) as Transaction[];
    return result;
}

export async function getTransactionItems(id_transaction: any): Promise<Transaction_items[]> {
    const result = (await queryDatabase(
        "SELECT * FROM transaction_items WHERE id_transaction = ?",
        [id_transaction]
    )) as Transaction_items[];
    return result;
}

export async function sumTotalTransaction(): Promise<Transaction | null> {
    const date = new Date();
    const result = (await queryDatabase("SELECT SUM(total_price) AS value FROM transactions WHERE created_at >= CURDATE() AND created_at < CURDATE() + INTERVAL 1 DAY;"
    )) as RowDataPacket[];
    return result.length > 0 ? (result[0] as Transaction):null;
}

export async function sumTotalAmountTransaction(): Promise<Transaction | null> {
    const date = new Date();
    const result = (await queryDatabase("SELECT SUM(total_amount) AS value FROM transactions WHERE created_at >= CURDATE() AND created_at < CURDATE() + INTERVAL 1 DAY;"
    )) as RowDataPacket[];
    return result.length > 0 ? (result[0] as Transaction):null;
}

export async function insertTransaction(
  transaction:Transaction
): Promise<number> {
    const { invoice_number, total_price, total_amount } = transaction;
    const result = (await queryDatabase(
        "INSERT INTO transactions (invoice_number, total_price, total_amount) VALUES (?, ?, ?)",
        [invoice_number, total_price, total_amount]
    )) as ResultSetHeader;

    return result.insertId;
}

export async function insertTransactionItems( transactionItems: Transaction_items) : Promise<number> {
    const { id_transaction, id_product, barcode, product_name, qty, selling_price, subtotal } = transactionItems;
    const result = (await queryDatabase(
        "INSERT INTO transaction_items (id_transaction, id_product, barcode, product_name, quantity, selling_price, subtotal) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [id_transaction, id_product, barcode, product_name, qty, selling_price, subtotal]
    )) as ResultSetHeader;

    return result.insertId;
}

export async function getTodayTransactionCount(): Promise<any>{
    const date = new Date();
    const result = (await queryDatabase(
        "SELECT COUNT(*) AS value FROM transactions WHERE DATE(transaction_date) = Date(?)",
        [date]
    )) as RowDataPacket[];
    return result.length > 0 ? result[0].value : 0; //value from object name in As value
} 