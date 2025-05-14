import { Product , getAllProduct , getProductById , insertProduct, updateProduct,deleteProduct, searchBarcodeProduct, updateQtyProduct} from "../models/productModel/productModel";
import { insertDetailSupplier,updateDetailSupplier } from "../models/detail_supplier/detail_supplier";
import { insertDetailWarehouse,updateDetailWarehouse } from "../models/detail_warehouse/detail_warehouse";
import { DetailSupplier } from "../models/detail_supplier/detail_supplier";
import { DetailWarehouse } from "../models/detail_warehouse/detail_warehouse";
import { UpdateQtyData } from "../models/productModel/productModel";
import { RowDataPacket, ResultSetHeader } from "mysql2"; 

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

export async function searchBarcodeProductService(barcode : string) : Promise<{ success: boolean; data?: Product; message?: string; status:number}> {
    try{
        const product = await searchBarcodeProduct(barcode);
        if(product){
            return {success: true, data: product, status: 201}
        }
        else{
            return {success: false, status: 404, message: "Barcode Product not found"}
        }

    } catch (error : any){
        return {success: false, message:error.message , status:500}
    }
}

export async function insertProductService(
    product:Product,
    id_supplier : any,
    id_inventory : any
) : Promise<{success: boolean; data?:Product; message?:string}>{
    try{
        const result = await insertProduct(product);
        const supplierDetail: DetailSupplier = {
            id_product: result,
            id_supplier: id_supplier,
            qty : product.qty,
            hpp: product?.hpp ?? 0, 
         };

        const warehouseDetail: DetailWarehouse = {
            id_product: result,
            id_inventory: id_inventory,
            qty: product.qty, 
            movement_type : "IN",
        };

        await insertDetailSupplier(supplierDetail);
        await insertDetailWarehouse(warehouseDetail);
        
        return {success:true, message:"Product inserted successfully"}
    }catch(error:any){
        return {success:false, message:error.message}
    }
}

export async function updateProductService(
  id_product: number,
  product: Product,
  id_supplier: number,
  id_inventory: number
): Promise<{ success: boolean; status: number; message?: string }> {
  try {
    const result = await updateProduct(id_product, product);
    const supplierDetail: DetailSupplier = {
        id_product,
        id_supplier,
        qty : product.qty,
        hpp: product?.hpp ?? 0, 
    };

    const warehouseDetail: DetailWarehouse = {
        id_product,
        id_inventory,
        qty: product.qty, 
        movement_type : "IN", 
    };

    if (!result) {
      return { success: false, message: "Product not found", status: 404 };
    }

    const supplierUpdated = await updateDetailSupplier(supplierDetail);
    const warehouseUpdated = await updateDetailWarehouse(warehouseDetail);

    if (!supplierUpdated || !warehouseUpdated) {
      return {
        success: false,
        message: !supplierUpdated
          ? "Supplier detail not found"
          : "Warehouse detail not found",
        status: 404,
      };
    }

    return {
      success: true,
      message: "Product and related data updated successfully",
      status: 201,
    };
  } catch (e: any) {
    return { success: false, message: e.message, status: 500 };
  }
}

export async function updateQtyProductService(id_product:number,updateData : UpdateQtyData): Promise<{success:boolean, status:number, message?:string}>{
    try{
        const oldQty = await getProductById(id_product);
        const id_supplier = updateData.id_supplier;
        const id_inventory = updateData.id_inventory;
        const newQty = (oldQty?.qty ?? 0) + updateData.qty; 
        const result = await updateQtyProduct(id_product,newQty);
        const supplierDetail: DetailSupplier = {
            id_product,
            id_supplier,
            qty : newQty,
            hpp: updateData?.hpp ?? 0, 
        };
        const warehouseDetail: DetailWarehouse = {
            id_product,
            id_inventory,
            qty: newQty, 
            movement_type : "IN", 
        };
        await insertDetailSupplier(supplierDetail);
        await insertDetailWarehouse(warehouseDetail);

        if(result){
            return {success:true, message:"Product updated successfully", status:201}
        }else{
            return {success:false, message:"Product not found", status:404}
        }
    }catch(e:any){
            return { success: false, message: e.message, status: 500 };
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