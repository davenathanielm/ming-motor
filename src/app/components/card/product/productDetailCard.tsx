import { Product } from "../../../../../models/productModel/productModel";

type Props = {
    product: Product;
}

export default function ProductDetailCard({product} : Props) {
    return(
        <div className="text-black">
            <h2 className="text-xl font-bold mb-4">Detail Produk</h2>
            <p><strong>Nama :</strong> {product.name ?? "-"} </p>
            <p><strong>Barcode :</strong> {product.barcode ?? "-"}</p>
            <p><strong>Brand :</strong> {product.brand ?? "-"}</p>
            <p><strong>Jumlah :</strong> {product.qty ?? "-"}</p>
            <p><strong>HPP :</strong> {product.hpp ?? "-"}</p>
            <p><strong>Harga Jual :</strong> {product.selling_price}</p>
            <p><strong>Status :</strong> {product.status}</p>
            <p><strong>Description :</strong> {product.description}</p>
            <p><strong>Tanggal Dibuat :</strong> {new Date(product.created_at).toLocaleDateString()}</p>
            <p><strong>Tanggal Diperbarui :</strong> {new Date(product.updated_at).toLocaleDateString()}</p>
        </div>
    )

}