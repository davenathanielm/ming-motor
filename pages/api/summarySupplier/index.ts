import { NextApiRequest, NextApiResponse } from "next";
import { getSupplierSummaryService } from "../../../services/detailSupplierService";
import { SupplierSummary } from "../../../models/detail_supplier/detail_supplier";
import { AuthenticatedNextApiRequest, withAuth } from "../../../lib/auth/helperAuth";

async function handler(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            const result = await getSupplierSummaryService();
            return res.status(result.success ? 201 : 500).json(result);
        } else {
            return res.status(405).json({ success: false, message: "Method not allowed" });
        }
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export default withAuth(handler);