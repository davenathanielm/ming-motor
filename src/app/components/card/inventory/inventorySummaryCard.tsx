import { InventorySummary } from "../../../../../models/detail_warehouse/detail_warehouse";
import { currencyFormat, formatDate } from "../../items/date";
import {Card , Item} from "../cardComponent";

type Props = {
    inventorySummary: InventorySummary;
}

export default function InventorySummaryCard({inventorySummary} : Props) {
    return (
        <div className="text-black">
            <h1 className="font-bold text-2xl mt-4">{inventorySummary.name ?? "-"}</h1>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">

                <Card title="Informasi Produk" color="text-blue-500">
                    <Item label="barcode" value={inventorySummary.barcode ?? "-"} />
                    <Item label="Jumlah Barang" value={inventorySummary.qty ?? "-"} />
                </Card>
                <Card title="Informasi Penyimpanan" color="text-blue-500">
                    <Item label="Lokasi" value={inventorySummary.location ?? "-"} />
                    <Item label="Tipe Pergerakan" value={inventorySummary.movement_type ?? "-"} />
                </Card>

                <Card title="Tanggal Dibuat" color="text-green-500">
                    <Item label="Tanggal Dibuat" value={formatDate(inventorySummary.created_at.toString())} />
                    <Item label="Tanggal Diperbarui" value={formatDate(inventorySummary.updated_at.toString())} />
                </Card>
                
                <Card title="Deskripsi" color="text-green-500"className="col-span-1">
                     <p className="text-gray-700 text-sm">{inventorySummary.description || "-"}</p>

                </Card>
            </div>
        </div>   
    )
}