import { Supplier } from "../../../../../models/supplierModel/supplierModel";
import { currencyFormat, formatDate } from "../../items/date";
import { Card,Item } from "../cardComponent";

type Props = {
    supplier: Supplier;
};

export default function SupplierDetailCard({supplier} : Props) {
    return (
        <div className="text-black">
            {/* <h1 className="font-bold text-2xl">Detail Supplier</h1> */}
            <h1 className="font-bold text-2xl mt-4">{supplier.supplier_name ?? "-"}</h1>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
                <Card title="Informasi Supplier" color="text-blue-500">
                    <Item label="Nama" value={supplier.supplier_name ?? "-"} />
                    <Item label="No Telepon" value={supplier.phone_number ?? "-"} />
                </Card>

                <Card title="Alamat" color="text-yellow-500">
                    <Item label="Kota" value={supplier.city ?? "-"} />
                </Card>

                <Card title="Tanggal Dibuat" color="text-green-500">
                    <Item label="Tanggal Dibuat" value={formatDate(supplier.created_at.toString())} />
                    <Item label="Tanggal Diperbarui" value={formatDate(supplier.updated_at.toString())} />
                </Card>
               
                <Card title="Deskripsi" color="text-green-500"className="col-span-1">
                     <p className="text-gray-700 text-sm">{supplier.comment || "-"}</p>

                </Card>
            </div>
        </div>   
    )
}