import { NextApiRequest, NextApiResponse } from "next";
import { updateStatusProductService } from "../../../../services/productService";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;
        const productId = Number(id);
        const session = await getServerSession(req,res,authOptions)
        const userId = session?.user?.id;
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        if (req.method === "PUT") {
            const { status } = req.body;
            const result = await updateStatusProductService(productId, status, userId);
            return res.status(result.status).json({ success: result.success, message: result.message , data : status });
        }
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}