import { NextApiRequest , NextApiResponse } from "next";
import { Employee } from "../../../models/employeeModel/employeeModel";
import { getEmployeeByIdService , updateEmployeeService , deleteEmployeeService } from "../../../services/employeService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query;
        const employeeId = Number(id);

        if (req.method === "GET") {
                const result = await getEmployeeByIdService(id);
                return res.status(result.status).json({ success: result.success, data: result.data, message: result.message , id: employeeId });
        }

        if (req.method === "PUT") {
            const { full_name, phone, address, position, id_user, join_date, image_url } = req.body;

            if (!full_name || !phone || !address || !position || !join_date ) {
                return res.status(400).json({ success: false, message: "Missing required fields" });
            }
            
            // @ts-ignore
            const employee: Employee = { full_name, phone, address, position, id_user, join_date, image_url };
            const result = await updateEmployeeService(employeeId, employee);
            return res.status(result.status).json({ success: result.success, message: result.message });
        }

        if (req.method === "DELETE") {
            const result = await deleteEmployeeService(employeeId);
            return res.status(result.status).json({ success: result.success, message: result.message });
        }

        return res.status(405).json({ success: false, message: "Method not allowed" });
    } catch (error: any) {
        return res.status(500).json({ success: false, message: error.message });
    }
}