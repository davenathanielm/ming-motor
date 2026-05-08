import { NextApiRequest, NextApiResponse } from "next";
import { updateStatusProductService } from "../../../../services/productService";
import { authOptions } from "../../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { AuthenticatedNextApiRequest , withAuth } from "../../../../lib/auth/helperAuth";

async function handler(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;
        const productId = Number(id);
        const userId = req?.user?.id;

        if (req.method === "PUT") {
            const { status } = req.body;
            const result = await updateStatusProductService(productId, status, userId);
            return res.status(result.status).json({ success: result.success, message: result.message , data : status });
        }
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export default withAuth(handler);