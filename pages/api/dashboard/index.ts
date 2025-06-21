import { NextApiRequest , NextApiResponse } from "next";
import { getDashboardSummaryService } from "../../../services/productService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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