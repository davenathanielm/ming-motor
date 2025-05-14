import { SupplierSummary } from "../../../../../models/detail_supplier/detail_supplier";
import { currencyFormat, formatDate } from "../../items/date";
import {Card , Item} from "../cardComponent";

type Props = {
    supplierSummary: SupplierSummary;
}

export default function SupplierSummaryCard({supplierSummary} : Props) {
    return (
        <div className="text-black">
            <h1 className="font-bold text-2xl mt-4">{supplierSummary.name ?? "-"}</h1>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">

                <Card title="Informasi Produk" color="text-blue-500">
                    <Item label="barcode" value={supplierSummary.barcode ?? "-"} />
                    <Item label="Jumlah Barang" value={supplierSummary.qty ?? "-"} />
                    <Item label="HPP" value={supplierSummary.hpp ?? "-"} />
                </Card>
                <Card title="Informasi Supplier" color="text-blue-500">
                    <Item label="Nama" value={supplierSummary.supplier_name ?? "-"} />
                    <Item label="No Telepon" value={supplierSummary.phone_number ?? "-"} />
                    <Item label="Kota" value={supplierSummary.city ?? "-"} />
                </Card>

                <Card title="Tanggal Dibuat" color="text-green-500">
                    <Item label="Tanggal Dibuat" value={formatDate(supplierSummary.created_at.toString())} />
                    <Item label="Tanggal Diperbarui" value={formatDate(supplierSummary.updated_at.toString())} />
                </Card>
                
                <Card title="Deskripsi" color="text-green-500"className="col-span-1">
                     <p className="text-gray-700 text-sm">{supplierSummary.description || "-"}</p>

                </Card>
            </div>
        </div>   
    )
}
