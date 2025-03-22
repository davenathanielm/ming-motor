 import { getAllReturnGoodsModel , getReturnGoodsByIdModel , insertReturnGoodsModel, updateReturnGoodsModel,deleteReturnGoodsModel , ReturnGoods } from "../models/returnGoodsModel/returnGoodsModel";

export async function getAllReturnGoodsService(): Promise<{ success: boolean; data?: ReturnGoods[]; message?: string }> {
    try {
        const returnGoods = await getAllReturnGoodsModel();
        return {success: true, data: returnGoods}; 
    } catch (error: any) {
        return {success: false, message: error.message}; 
    }
}

export async function getReturnGoodsByIdService(id_return : number) : Promise<{ success: boolean; data?: ReturnGoods; message?: string; status:number}> {
    try{
        const returnGoods = await getReturnGoodsByIdModel(id_return);
        if(returnGoods){
            return {success: true, data: returnGoods, status: 201}
        }
        else{
            return {success: false, status: 404, message: "Return Goods not found"}
        }

    } catch (error : any){
        return {success: false, message:error.message , status:500}
    }
}

export async function insertReturnGoodsService(returnGoods:ReturnGoods) : Promise<{success: boolean; data?:ReturnGoods; message?:string}>{
    try{
        const result = await insertReturnGoodsModel(returnGoods);
        return {success:true, message:"Return Goods inserted successfully"}
    }catch(error:any){
        return {success:false, message:error.message}
    }
}

export async function updateReturnGoodsService(id_return:number, returnGoods:ReturnGoods): Promise<{success: boolean; status: number, message?:string}>{
    try{
        const result = await updateReturnGoodsModel(id_return,returnGoods);
        if(result){
            return {success: true , message: "Return Goods Updated Successfully", status:201}
        } else{
            return {success:false, message:"Return Goods not found", status:404}
        }
    } catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}

export async function deleteReturnGoodsService(id_return:number): Promise<{success:boolean, status:number, message?:string}>{
    try{
        const result = await deleteReturnGoodsModel(id_return);
        if(result){
            return {success:true, message:"Return Goods deleted successfully", status:201}
        }else{
            return {success:false, message:"Return Goods not found", status:404}
        }
    }catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}