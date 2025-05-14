import { Product } from "../../../../../models/productModel/productModel";
import { currencyFormat, formatDate } from "../../items/date";
import { Card } from "../cardComponent";
import { Item } from "../cardComponent";

type Props = {
  product: Product;
};

export default function ProductDetailCard({ product }: Props) {
  return (
    <div className="text-black">
      {/* <h2 className="text-xl font-bold mb-4">Detail Produk</h2>
      <div className="border-b border-gray-300 mb-4"></div> */}

      <div className="flex flex-col gap-6">
        {/* Image Placeholder */}
        {/* <div className="w-full h-40 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500 text-sm">
          Masukkan Gambar
        </div> */}

        {/* Product Name */}
        <h1 className="font-bold text-2xl mt-4">{product.name ?? "-"}</h1>

        {/* Product Info Grid */}
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          {/* Product Info */}
          <Card title="Product Info" color="text-blue-500">
            <Item label="Brand" value={product.brand ?? "Astra"} />
            <Item label="Barcode" value={product.barcode ?? "-"} />
          </Card>

          {/* Stock Info */}
          <Card title="Stock Info" color="text-yellow-500">
            <Item label="Stock" value={`${product.qty ?? 0} units`} className="text-lg" />
          </Card>

          {/* Price Info */}
          <Card title="Harga" color="text-green-500">
            <Item label="HPP" value={currencyFormat(product.hpp) ?? "Rp0"} />
            <Item label="Harga Jual" value={currencyFormat(product.selling_price) ?? "Rp0"} />
          </Card>

          {/* Tanggal Info */}
          <Card title="Informasi Tambahan" color="text-purple-500" className="">
            <Item label="Tanggal dibuat" value={formatDate(product.created_at.toString())} />
            <Item label="Terakhir diupdate" value={formatDate(product.updated_at.toString())} />
          </Card>

          {/* Description */}
          <Card title="Deskripsi" className="sm:col-span-2" color="text-blue-500">
            <p className="text-gray-700 text-sm">{product.description || "-"}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}


