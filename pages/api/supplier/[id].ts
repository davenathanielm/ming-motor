import { NextApiRequest, NextApiResponse } from "next";
import { getSupplierByIdService,updateSupplierService,deleteSupplierService } from "../../../services/supplierServices";
import { Supplier } from "../../../models/supplierModel/supplierModel";
import { AuthenticatedNextApiRequest , withAuth } from "../../../lib/auth/helperAuth";

     async function handler(req : AuthenticatedNextApiRequest, res:NextApiResponse){
    try{
        const {id} = req.query;
        const supplierId = Number(id); 
        if (isNaN(supplierId)) {
            return res.status(400).json({ success: false, message: "Invalid supplier ID" }); // ✅ Moved outside `if`
        }

        if(req.method=== "GET"){
            const result = await getSupplierByIdService(supplierId);
           return res.status(result.status).json({ success: result.success, data: result.data, message: result.message }); 
        }

        if(req.method === "PUT"){
            const {supplier_name,phone_number,city,comment} = req.body;
            const supplier : Supplier = {supplier_name,phone_number,city,comment};
            const result = await updateSupplierService(supplierId,supplier);
            return res.status(result.status).json({success: result.success, message: result.message});
        }

        if(req.method === "DELETE"){
            const result = await deleteSupplierService(supplierId);
            return res.status(result.status).json({success:result.success, message:result.message});
        }

    }catch(error:any){
        return res.status(500).json({success:false,message:error.message});
    }
}

export default withAuth(handler);

// rules
// 1. why always need to use const {id} because it match with file name
// 2. res.status and res.json is divided so it can exclude status in json response 