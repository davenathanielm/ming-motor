import { NextApiRequest, NextApiResponse } from "next";
import { getSupplierSummaryTodayService } from "../../../../services/detailSupplierService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            const supplierSummary = await getSupplierSummaryTodayService();
            return res.status(supplierSummary.success ? 200 : 500).json(supplierSummary);
        }
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}