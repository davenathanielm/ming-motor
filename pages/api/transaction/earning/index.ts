import { NextApiRequest , NextApiResponse } from "next";
import { fetchAllTransactionsService } from "../../../../services/transactionService";
import { fetchTotalTransactionService } from "../../../../services/transactionService";
import { UpdateQtyData } from "../../../../models/productModel/productModel";
import { ProductTransaction } from "../../../../models/productModel/productModel";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            const result = await fetchTotalTransactionService();
            return res.status(result.success? 201:500).json({success: result.success, data: result.data, message: result.message });
          } 
        
          else {
            return res.status(405).json({ success: false, message: "Method not allowed" });
          }
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}