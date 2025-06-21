import { NextApiRequest, NextApiResponse } from "next";
import { fetchTransactionItemsService } from "../../../../services/transactionService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({ success: false, message: "Transaction ID is required" });
            }

            const transactionItems = await fetchTransactionItemsService(id);
            return res.status(transactionItems.success ? 200 : 500).json({
                success: transactionItems.success,
                data: transactionItems.data,
                message: transactionItems.message
            });
        } else {
            return res.status(405).json({ success: false, message: "Method not allowed" });
        }
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}