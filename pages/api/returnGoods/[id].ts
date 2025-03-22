import { NextApiRequest, NextApiResponse } from "next";
import { getAllReturnGoodsService, getReturnGoodsByIdService,insertReturnGoodsService,updateReturnGoodsService,deleteReturnGoodsService} from "../../../services/returnGoodsService";
import { ReturnGoods } from "../../../models/returnGoodsModel/returnGoodsModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const {id} = req.query;
        const returnGoodsId = Number(id);

        if(isNaN(returnGoodsId)){
            return res.status(400).json({success:false,message:"Invalid returnGoods ID"});
        }

        if(req.method === "GET"){
            const returnGoods = await getReturnGoodsByIdService(returnGoodsId);
            return res.status(returnGoods.status).json({success:returnGoods.success, data:returnGoods.data, message:returnGoods.message});
        }

        if(req.method === "PUT"){
            const {reason , refund_status ,qty_return} = req.body;
            const returnGoods: ReturnGoods = {reason , refund_status ,qty_return};
            const result = await updateReturnGoodsService(returnGoodsId,returnGoods);
            return res.status(result.status).json({success:result.success, message:result.message});
        }

        if(req.method === "DELETE"){
            const result = await deleteReturnGoodsService(returnGoodsId);
            return res.status(result.status).json({success:result.success, message:result.message});
        }
        return res.status(405).json({success:false,message:"Method not allowed"});
    }catch(error: any){
        return res.status(500).json({success:false,message:error.message});
    }
}