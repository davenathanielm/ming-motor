import { NextApiRequest, NextApiResponse } from "next";
import { updateStatusProductService } from "../../../../services/productService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;
        const productId = Number(id);

        if (req.method === "PUT") {
            const { status } = req.body;
            const result = await updateStatusProductService(productId, status);
            return res.status(result.status).json({ success: result.success, message: result.message , data : status });
        }
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}