import { NextApiRequest, NextApiResponse } from "next";
import { getAllDetailReturnService, insertDetailReturnService } from "../../../services/detailReturnGoodsService";
import { DetailReturn } from "../../../models/detail_return_goods/detail_return_goods_model";

export default async function handler(req: NextApiRequest ,res: NextApiResponse){
    try{
        if(req.method === "GET"){
            const detailReturnGoods = await getAllDetailReturnService();
            return res.status(detailReturnGoods.success ? 201 : 500).json(detailReturnGoods);
        }

        if(req.method === "POST"){
            const {id_return, id_product} = req.body;
            const detailReturn: DetailReturn = {id_product, id_return};
            const result = await insertDetailReturnService(detailReturn);
            return res.status(result.success ? 201 : 500).json(result);
        }
    }
    catch(error: any){
        return res.status(500).json({success:false, message:error.message});
    }
}