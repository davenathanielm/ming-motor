import { Employee } from "../../../../../models/employeeModel/employeeModel";
import { formatDate } from "../../items/date";
import { Card, Item } from "../cardComponent";

type Props = {
    employee: Employee;
};

export default function EmployeeDetailCard({ employee }: Props) {
    return (
        <div className="text-black">
            <h1 className="font-bold text-2xl mt-4">{employee.full_name ?? "-"}</h1>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
                <Card title="Informasi Karyawan" color="text-blue-500">
                    <Item label="Nama" value={employee.full_name ?? "-"} />
                    <Item label="No Telepon" value={employee.phone ?? "-"} />
                    <Item label="Posisi" value={employee.position ?? "-"} />
                </Card>

                <Card title="Alamat" color="text-yellow-500">
                    <Item label="Alamat" value={employee.address ?? "-"} />
                </Card>

                <Card title="Tanggal Bergabung" color="text-green-500">
                    <Item label="Tanggal Bergabung" value={formatDate(employee?.join_date)} />
                    <Item label="Tanggal Dibuat" value={formatDate(employee.created_at.toString())} />
                    <Item label="Tanggal Diperbarui" value={formatDate(employee.updated_at.toString())} />
                </Card>
            </div>
        </div>
    );
}