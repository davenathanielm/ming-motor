import { getAllTransaction , sumTotalTransaction, insertTransaction, insertTransactionItems, getAllTransactionToday, getTransactionItems } from "../models/transactionModel/transactionModel";
import { Transaction , Transaction_items, getTodayTransactionCount } from "../models/transactionModel/transactionModel";
import { reverseFormatDate } from "@/app/components/items/date";

export async function fetchAllTransactionsService(): Promise<{success?: boolean; data?: Transaction[]; message?: string}> {
    try{
        const transactions = await getAllTransaction();
        return {success: true, data: transactions, message: "Transactions fetched successfully"};
    }catch(error : any){
        console.error("Error fetching transactions:", error);
        return {success: false, message: "Failed to fetch transactions"};
    }
}

export async function fetchAllTransactionsTodayService(): Promise<{success?: boolean; data?: Transaction[]; message?: string}> {
    try{
        const transactions = await getAllTransactionToday();
        return {success: true, data: transactions, message: "Transactions fetched successfully"};
    }catch(error : any){
        console.error("Error fetching transactions:", error);
        return {success: false, message: error.message || "Failed to fetch transactions"};
    }
}

export async function fetchTotalTransactionService(): Promise<{success?: boolean; data?: Transaction | null; message?: string}> {
    try{
        const totalTransaction = await sumTotalTransaction();
        return {success: true, data: totalTransaction, message: "Total transaction fetched successfully"};
    }catch(error : any){
        console.error("Error fetching total transaction:", error);
        return {success: false, message: error.message || "Failed to fetch total transaction"};
    }
}

export async function fetchTransactionItemsService(id_transaction: any): Promise<{success?: boolean; data?: Transaction_items[]; message?: string}> {
    try{
        const transactionItems = await getTransactionItems(id_transaction);
        return {success: true, data: transactionItems, message: "Transaction items fetched successfully"};
    }catch(error : any){
        console.error("Error fetching transaction items:", error);
        return {success: false, message: error.message || "Failed to fetch transaction items"};
    }
}

export async function insertTransactionService(
    transaction:Transaction,
    transactionItems: Transaction_items[] = []
): Promise<{success?: boolean; data?: any; message?: string}> {
    try{
        const invoice = await generateInvoice();
        const transactionWithInvoice = {
            ...transaction,
            invoice_number: invoice, // Generate invoice number
        }
        
        const id_transaction = await insertTransaction(transactionWithInvoice);
            for (const item of transactionItems) {
                const { id_product, barcode, product_name, qty, selling_price } = item;
                const subtotal = qty * selling_price;
                // @ts-ignore
                const transaction:Transaction_items = {id_product, barcode,product_name, qty , selling_price , subtotal ,id_transaction }; // Set the transaction ID for each item
                await insertTransactionItems(transaction);
            }
        return {success: true, message: "Transaction created successfully"};
    }catch(error : any){
        console.error("Error creating transaction:", error);
        return {success: false, message: error.message || "Failed to create transaction"};
    }
}

 async function generateInvoice() : Promise<string> {
    try{
        const today = reverseFormatDate();
        const countToday = await getTodayTransactionCount();
        const todaySequence =  String(countToday + 1).padStart(4, '0'); //  Pad sequence number with leading zeros (e.g., 1 → "0001")

        const invoiceNumber = `INV-${today}-${todaySequence}`
        return invoiceNumber;
    } catch (error: any) {
        throw new Error ("Error generating invoice number: " + error.message);
    }   
}