import { NextApiRequest , NextApiResponse } from "next";
import { getAllEmployeeService , insertEmployeeService } from "../../../services/employeService";
import { Employee } from "../../../models/employeeModel/employeeModel";
import { AuthenticatedNextApiRequest , withAuth } from "../../../lib/auth/helperAuth";

async function handler(req: AuthenticatedNextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            const result = await getAllEmployeeService();
            return res.status(result.success ? 201: 500).json({ success: result.success, data: result.data });
        }

        if (req.method === "POST") {
            const {full_name , phone , address , position , id_user , join_date , image_url } = req.body;
            // @ts-ignore
            const employee:Employee = {full_name, phone, address , position, id_user: "", join_date , image_url :""};
            const result = await insertEmployeeService(employee);
            return res.status(result.success ?  201: 500).json({ success: result.success, message: result.message });
        }

        // Handle unsupported methods
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export default withAuth(handler);
