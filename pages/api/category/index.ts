import { NextApiRequest, NextApiResponse } from "next";
import { getAllCategoryService, insertCategoryService } from "../../../services/categoryService";
import { Category } from "../../../models/categoryModel/categoryModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { AuthenticatedNextApiRequest, withAuth} from "../../../lib/auth/helperAuth";

 async function handler( req: AuthenticatedNextApiRequest, res: NextApiResponse){
    try{
        const userId = req?.user?.id;

        if(req.method === "GET"){
            const categories = await getAllCategoryService();
            return res.status(categories.success ? 201 : 500).json(categories);
        }

        if(req.method === "POST"){
            const {category_name, description} = req.body;
            const category: Category = {category_name, description};
            const result = await insertCategoryService(category, userId);
            return res.status(result.success ? 201 : 500).json(result);
        }
        return res.status(405).json({success:false,message:"Method not allowed"});
    }catch(error: any){
        return res.status(500).json({success:false,message:error.message});
    }
}
export default withAuth(handler);