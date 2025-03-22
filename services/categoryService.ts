 import { Category , insertCategory , getAllCategory, updateCategory,deleteCategory,getCategoryById } from "../models/categoryModel/categoryModel";

export async function getAllCategoryService(): Promise<{ success: boolean; data?: Category[]; message?: string }> {
    try {
        const category = await getAllCategory();
        return {success: true, data: category}; 
    } catch (error: any) {
        return {success: false, message: error.message}; 
    }
}

export async function getCategoryByIdService(id_category : number) : Promise<{ success: boolean; data?: Category; message?: string; status:number}> {
    try{
        const category = await getCategoryById(id_category);
        if(category){
            return {success: true, data: category, status: 201}
        }
        else{
            return {success: false, status: 404, message: "Category not found"}
        }
    } catch (error : any){
        return {success: false, message:error.message , status:500}
    }
}

export async function insertCategoryService(category:Category) : Promise<{success: boolean; data?:Category; message?:string}>{
    try{
        const result = await insertCategory(category);
        return {success:true, message:"Category inserted successfully"}
    }catch(error:any){
        return {success:false, message:error.message}
    }
}

export async function updateCategoryService(id_category:number, category:Category): Promise<{success: boolean; status: number, message?:string}>{
    try{
        const result = await updateCategory(id_category,category);
        if(result){
            return {success: true , message: "Category Updated Successfully", status:201}
        } else{
            return {success:false, message:"Category not found", status:404}
        }
    } catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}

export async function deleteCategoryService(id_category:number): Promise<{success:boolean, status:number, message?:string}>{
    try{
        const result = await deleteCategory(id_category);
        if(result){
            return {success:true, message:"Category deleted successfully", status:201}
        }else{
            return {success:false, message:"Category not found", status:404}
        }
    }catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}