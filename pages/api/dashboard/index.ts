import { NextApiRequest , NextApiResponse } from "next";
import { getDashboardSummaryService } from "../../../services/productService";
import { AuthenticatedNextApiRequest, withAuth } from "../../../lib/auth/helperAuth";

 async function handler(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
    try{
        if(req.method === "GET"){
            const summary = await getDashboardSummaryService();
            return res.status(summary.status).json(summary);
        }
        return res.status(405).json({success:false,message:"Method not allowed"});
    }catch(error:any){
        return res.status(500).json({success:false,message:error.message});
    }
}

export default withAuth(handler);