import { NextApiRequest, NextApiResponse } from "next";
import { getAllCategoryService, insertCategoryService } from "../../../services/categoryService";
import { Category } from "../../../models/categoryModel/categoryModel";

export default async function handler( req: NextApiRequest, res: NextApiResponse){
    try{
        if(req.method === "GET"){
            const categories = await getAllCategoryService();
            return res.status(categories.success ? 201 : 500).json(categories);
        }

        if(req.method === "POST"){
            const {category_name, description} = req.body;
            const category: Category = {category_name, description};
            const result = await insertCategoryService(category);
            return res.status(result.success ? 201 : 500).json(result);
        }
        return res.status(405).json({success:false,message:"Method not allowed"});
    }catch(error: any){
        return res.status(500).json({success:false,message:error.message});
    }
}