import { NextApiRequest , NextApiResponse } from "next";
import { transactionService } from "../../../services/productService";
import { UpdateQtyData } from "../../../models/productModel/productModel";
import { ProductTransaction } from "../../../models/productModel/productModel";
import { insertTransactionService, fetchAllTransactionsService } from "../../../services/transactionService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "PUT") {
            const items: ProductTransaction[] = req.body;
      
            if (!Array.isArray(items) || items.length === 0) {
              return res.status(400).json({ success: false, message: "Invalid or empty items array" });
            }
      
            const result = await transactionService(items);
      
            return res.status(result.status).json(result);
          } 
          
          else if (req.method === "POST") {
            const { transaction, transactionItems }: { transaction: any; transactionItems: any[] } = req.body;

            if (!transaction || !Array.isArray(transactionItems)) {
                return res.status(400).json({ success: false, message: "Invalid transaction data" });
            }

            const result = await insertTransactionService(transaction, transactionItems);
            return res.status(result.success? 201:500).json({ success: result.success, message: result.message });
          }

          else if (req.method === "GET") {
            const transactions = await fetchAllTransactionsService();
            return res.status(transactions.success? 201:500).json({ status: transactions.success ,data: transactions.data ,message: transactions.message });
          }

          else {
            return res.status(405).json({ success: false, message: "Method not allowed" });
          }
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}