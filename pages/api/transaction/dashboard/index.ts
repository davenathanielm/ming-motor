import { NextApiRequest, NextApiResponse } from "next";
import { fetchAllTransactionsTodayService } from "../../../../services/transactionService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            const transactionSummary = await fetchAllTransactionsTodayService();
            return res.status(transactionSummary.success ? 200 : 500).json(transactionSummary);
        }
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}