import { DetailReturn, getAllDetailReturn , updateDetailReturn, deleteDetailReturn,insertDetailReturn } from "../models/detail_return_goods/detail_return_goods_model";

export async function getAllDetailReturnService(): Promise<{ success: boolean; data?: DetailReturn[]; message?: string }> {
    try {
        const detailReturn = await getAllDetailReturn();
        return {success: true, data: detailReturn}; 
    } catch (error: any) {
        return {success: false, message: error.message}; 
    }
}

export async function insertDetailReturnService(detailReturn:DetailReturn) : Promise<{success: boolean; data?:DetailReturn; message?:string}>{
    try{
        const result = await insertDetailReturn(detailReturn);
        return {success:true, message:"Detail Return Goods inserted successfully"}
    }catch(error:any){
        return {success:false, message:error.message}
    }
}

export async function updateDetailReturnService(id_detail_return:number, detailReturn:DetailReturn): Promise<{success: boolean; status: number, message?:string}>{
    try{
        const result = await updateDetailReturn(id_detail_return,detailReturn);
        if(result){
            return {success: true , message: "Detail Return Goods Updated Successfully", status:201}
        } else{
            return {success:false, message:"Detail Return Goods not found", status:404}
        }
    } catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}

export async function deleteDetailReturnService(id_detail_return:number): Promise<{success:boolean, status:number, message?:string}>{
    try{
        const result = await deleteDetailReturn(id_detail_return);
        if(result){
            return {success:true, message:"Detail Return Goods deleted successfully", status:201}
        }else{
            return {success:false, message:"Detail Return Goods not found", status:404}
        }
    }catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}