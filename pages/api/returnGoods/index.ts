import { NextApiRequest, NextApiResponse } from "next";
import { getAllReturnGoodsService, getReturnGoodsByIdService,insertReturnGoodsService,updateReturnGoodsService,deleteReturnGoodsService} from "../../../services/returnGoodsService";
import { ReturnGoods } from "../../../models/returnGoodsModel/returnGoodsModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method === "GET"){
            const returnGoods = await getAllReturnGoodsService();
            return res.status(returnGoods.success ? 201 : 500).json(returnGoods);
        }

        if(req.method === "POST"){
            const {reason , refund_status ,qty_return} = req.body;
            const returnGoods: ReturnGoods = {reason , refund_status ,qty_return};
            const result = await insertReturnGoodsService(returnGoods);
            return res.status(result.success ? 201 : 500).json(result);
        }

        return res.status(405).json({success:false,message:"Method not allowed"});
    }catch(error: any){
        return res.status(500).json({success:false,message:error.message});
    }
}