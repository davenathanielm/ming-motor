import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getAllSupplierService, insertSupplierService } from "../../../services/supplierServices";
import { Supplier } from "../../../models/supplierModel/supplierModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if(req.method === "GET"){
            const suppliers = await getAllSupplierService();
            return res.status(suppliers.success ? 201 : 500).json(suppliers);
        }

        if(req.method === "POST"){
            const {supplier_name, phone_number,city,comment} = req.body;
            const supplier: any = {supplier_name, phone_number,city,comment};
            const result = await insertSupplierService(supplier);
            return res.status(result.success ? 201 : 500).json(result);
        }

        return res.status(405).json({success:false,message:"Method not allowed"});
    }catch(error: any){
        return res.status(500).json({success:false,message:error.message});
    }
}