import { Product , getAllProduct , getAllProductByOwner , getProductById, getProductByIdOwner , insertProduct, updateProduct,updateProductOwner,deleteProduct, searchBarcodeProduct, searchBarcodeProductByOwner , updateQtyProduct, updateStatus} from "../models/productModel/productModel";
import { insertDetailSupplier,updateDetailSupplier } from "../models/detail_supplier/detail_supplier";
import { insertDetailWarehouse,updateDetailWarehouse } from "../models/detail_warehouse/detail_warehouse";
import { DetailSupplier, getSupplierSummaryToday } from "../models/detail_supplier/detail_supplier";
import { DetailWarehouse } from "../models/detail_warehouse/detail_warehouse";
import { UpdateQtyData } from "../models/productModel/productModel";
import { RowDataPacket, ResultSetHeader } from "mysql2"; 
import { sumQtyProduct, sumBuyProduct } from "../models/productModel/productModel";
import { countEmployees } from "../models/employeeModel/employeeModel";
import { ProductTransaction } from "../models/productModel/productModel";
import { fetchAllBarcode } from "../models/productModel/productModel";
import { sumTotalTransaction, sumTotalAmountTransaction } from "../models/transactionModel/transactionModel";

export async function getAllProductService(role:string): Promise<{ success: boolean; data?: Product[]; message?: string }> {
    try {
        // role = "owner";
        if(role === "owner"){
            const product = await getAllProductByOwner();
            return {success: true, data: product}; 
        }
        console.log("ini role", role);
        const product = await getAllProduct();
        return {success: true, data: product}; 
    } catch (error: any) {
        return {success: false, message: error.message}; 
    }
}

export async function getProductByIdService(id_product : number , role: string) : Promise<{ success: boolean; data?: Product; message?: string; status:number}> {
    try{
        if(role === "owner"){
            const product = await getProductByIdOwner(id_product);
            if(product){
                return {success: true, data: product, status: 201}
            }
            else{
                return {success: false, status: 404, message: "Product not found"}
            }
        }
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

export async function searchBarcodeProductService(barcode : string , role : string) : Promise<{ success: boolean; data?: Product; message?: string; status:number}> {
    try{
        if(role === "owner"){
            const product = await searchBarcodeProductByOwner(barcode);
            if(product){
                return {success: true, data: product, status: 201}
            }
            else{
                return {success: false, status: 404, message: "Barcode Product not found"}
            }
        }
        else{
            const product = await searchBarcodeProduct(barcode);
            if(product){
                return {success: true, data: product, status: 201}
            }
            else{
                return {success: false, status: 404, message: "Barcode Product not found"}
            }
        }
    } catch (error : any){
        return {success: false, message:error.message , status:500}
    }
}

export async function fetchAllBarcodeService() : Promise<{success:boolean, data?: Product[], message?: string}> {
    try {
        const barcodes = await fetchAllBarcode();
        return {success: true, data : barcodes, message: "Barcodes fetched successfully"};
    } catch (error: any) {
        return {success: false, message: error.message};
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
            total_qty: product.qty,
            hpp: product?.hpp ?? 0, 
         };

        const warehouseDetail: DetailWarehouse = {
            id_product: result,
            id_inventory: id_inventory,
            qty: product.qty, 
            total_qty: product.qty,
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
  role :string
): Promise<{ success: boolean; status: number; message?: string }> {
  try {
    if (role === "owner"){
        const result = await updateProductOwner(id_product, product);
        if (!result) {
            return { success: false, message: "Product not found", status: 404 };
          }
    } else {
        const result = await updateProduct(id_product, product);
        if (!result) {
            return { success: false, message: "Product not found", status: 404 };
          }
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

export async function updateStatusProductService(id_product:number, status:string): Promise<{success:boolean, status:number, message?:string}>{
    try{
        const result = await updateStatus(id_product, status);
        if(result){
            return {success:true, message:"Product status updated successfully", status:201}
        }else{
            return {success:false, message:"Product not found", status:404}
        }
    }catch(e:any){
        return {success:false, message:e.message, status:500}
    }
}

export async function updateQtyProductService(id_product:number,updateData : UpdateQtyData): Promise<{success:boolean, status:number, message?:string}>{
    try{
        const product = await getProductById(id_product);
        const id_supplier = updateData.id_supplier;
        const id_inventory = updateData.id_inventory;

        const qty = updateData.qty;
        const oldQty = product?.qty ?? 0;

        const totalQty = oldQty + qty; 
        const result = await updateQtyProduct(id_product,totalQty);
        const supplierDetail: DetailSupplier = {
            id_product,
            id_supplier,
            qty : qty,
            total_qty:totalQty,
            hpp: updateData?.hpp ?? 0, 
        };
        const warehouseDetail: DetailWarehouse = {
            id_product,
            id_inventory,
            qty: qty,
            total_qty:totalQty, 
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

export async function transactionService(items : ProductTransaction[]): Promise<{success:boolean, status:number, message?:string}>{
    try{
        for (const item of items) {
            const product = await getProductById(item.id_product);
            const qty = item.qty;
            const oldQty = product?.qty ?? 0;
            
            const totalQty = oldQty - qty; 
            if (totalQty < 0) {
                return {
                  success: false,
                  status: 400,
                  message: `Insufficient stock for product ID ${item.id_product}`,
                };
              }
            const result =  await updateQtyProduct(item.id_product,totalQty);        
            if (!result) {
                return {
                  success: false,
                  status: 404,
                  message: `Product ID ${item.id_product} not found`,
                };
              }
        }
        return {success:true, message:"Product updated successfully", status:201}   
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

export async function getDashboardSummaryService() : Promise <{success:boolean, status: number, data?: {totalProduct: any, totalBuy:any , totalEmployee:any , totalEarning : any, totalAmount: any}, message?: string}> {
    try {
        const totalQtyProduct = await sumQtyProduct();
        const totalBuy = await sumBuyProduct();
        const totalEmployee = await countEmployees();
        const totalEarnings = await sumTotalTransaction();
        const totalAmount = await sumTotalAmountTransaction();
        return {
            success: true,
            status: 201,
            data: {
                totalProduct: totalQtyProduct,
                totalBuy: totalBuy,
                totalEmployee: totalEmployee,
                totalEarning: totalEarnings ? totalEarnings : 0,
                totalAmount: totalAmount ? totalAmount : 0
            },
            message: "Dashboard summary retrieved successfully"
        };
    }
    catch (error: any) {
        return {
            success: false,
            status: 500,
            message: error.message
        };
    }
}
