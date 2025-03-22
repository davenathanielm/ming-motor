import { NextApiRequest, NextApiResponse } from "next";
import { updateDetailReturnService , deleteDetailReturnService } from "../../../services/detailReturnGoodsService";
import { DetailReturn } from "../../../models/detail_return_goods/detail_return_goods_model";

export default async function handler(req: NextApiRequest ,res: NextApiResponse){
    try{
        const {id} = req.query;
        const detailId = Number(id);
        if(isNaN(detailId)){
            return res.status(500).json({success:false, message:"id must be a number"});
        }
        if(req.method === "PUT"){
            const {id_return, id_product} = req.body;
            const detailReturn: DetailReturn = {id_product, id_return};
            const result = await updateDetailReturnService(detailId,detailReturn);
           return res.status(result.status).json({success: result.success, message: result.message});
        }

        if(req.method === "DELETE"){
            const result = await deleteDetailReturnService(detailId);
            return res.status(result.status).json({success: result.success, message: result.message});
        }
    }
    catch(error: any){
        return res.status(500).json({success:false, message:error.message});
    }
}