import { NextApiRequest, NextApiResponse } from "next";
import { getSupplierSummaryTodayService } from "../../../../services/detailSupplierService";
import { AuthenticatedNextApiRequest, withAuth } from "../../../../lib/auth/helperAuth";

async function handler(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
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

export default withAuth(handler);   