import { NextApiRequest, NextApiResponse } from "next";
import { getCategoryByIdService, updateCategoryService,deleteCategoryService } from "../../../services/categoryService";
import { Category } from "../../../models/categoryModel/categoryModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        const {id} = req.query;
        const categoryId = Number(id);
        if(isNaN(categoryId)){
            return res.status(400).json({success:false,message:"Invalid category ID"});
        }
        if(req.method === "GET"){
            const category = await getCategoryByIdService(categoryId);
            return res.status(category.status).json({success:category.success,data:category.data,message:category.message});
        }

        if(req.method === "PUT"){
            const {category_name, description} = req.body;
            const category: Category = {category_name, description};
            const result = await updateCategoryService(categoryId, category);
            return res.status(result.status).json({success:result.success,message:result.message});
        }

        if(req.method === "DELETE"){
            const result = await deleteCategoryService(categoryId);
            return res.status(result.status).json({success:result.success,message:result.message});
        }

        return res.status(405).json({success:false,message:"Method not allowed"});
    }catch(error: any){
        return res.status(500).json({success:false,message:error.message});
    }
}