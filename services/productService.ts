import { Product , getAllProduct , getProductById , insertProduct, updateProduct,deleteProduct} from "../models/productModel/productModel";

export async function getAllProductService(): Promise<{ success: boolean; data?: Product[]; message?: string }> {
    try {
        const product = await getAllProduct();
        return {success: true, data: product}; 
    } catch (error: any) {
        return {success: false, message: error.message}; 
    }
}

export async function getProductByIdService(id_product : number) : Promise<{ success: boolean; data?: Product; message?: string; status:number}> {
    try{
        const product = await getProductById(id_product);
        if(product){
            return {success: true, data: product, status: 201}
        }
        else{
            return {success: false, status: 404, message: "Product not found"}
        }

    } catch (error : any){
        return {success: false, message:error.message , status:500}
    }
}

export async function insertProductService(product:Product) : Promise<{success: boolean; data?:Product; message?:string}>{
    try{
        const result = await insertProduct(product);
        return {success:true, message:"Product inserted successfully"}
    }catch(error:any){
        return {success:false, message:error.message}
    }
}

export async function updateProductService(id_product:number, product:Product): Promise<{success: boolean; status: number, message?:string}>{
    try{
        const result = await updateProduct(id_product,product);
        if(result){
            return {success: true , message: "Product Updated Successfully", status:201}
        } else{
            return {success:false, message:"Product not found", status:404}
        }
    } catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}

export async function deleteProductService(id_product:number): Promise<{success:boolean, status:number, message?:string}>{
    try{
        const result = await deleteProduct(id_product);
        if(result){
            return {success:true, message:"Product deleted successfully", status:201}
        }else{
            return {success:false, message:"Product not found", status:404}
        }
    }catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}