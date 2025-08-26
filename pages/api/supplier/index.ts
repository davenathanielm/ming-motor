import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { getAllSupplierService, insertSupplierService } from "../../../services/supplierServices";
import { Supplier } from "../../../models/supplierModel/supplierModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import jwt from "jsonwebtoken";
import { verifyToken } from "../../../lib/auth/auth";
import { withAuth, AuthenticatedNextApiRequest } from "../../../lib/auth/helperAuth";


async function supplierHandler(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
  const id_user = req.user?.id;

  if (req.method === "GET") {
    const suppliers = await getAllSupplierService();
    return res.status(suppliers.success ? 200 : 500).json(suppliers);
  }

  if (req.method === "POST") {
    const { supplier_name, phone_number, city, comment } = req.body;
    const supplier = { supplier_name, phone_number, city, comment };
    const result = await insertSupplierService(supplier, id_user);
    return res.status(result.success ? 201 : 500).json(result);
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}

export default withAuth(supplierHandler);

// the flow will be :
// 1. it called withAuth first because withAuth wrap these supplierHandler
// 2. after that in withAuth there is filter and checking for token or session
// 3. if successfull it will run supplierHandler with req and res that already modified in withAuth