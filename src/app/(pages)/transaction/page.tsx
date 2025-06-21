"use client";
import LayoutComponent from "@/app/components/layout/layoutComponent";
import { toast } from "sonner";
import { use, useState } from "react";
import Button from "@/app/components/items/button";
import { Combobox } from '@headlessui/react';
import { useFetchBarcodeProduct } from "../../../../lib/calledAPI/service/serviceApiProduct";
import { formBarcodeTransaction } from "@/app/components/items/formTemplate";
import FormRenderer from "@/app/components/items/formRender";
import {useForm} from "react-hook-form";
import {injectOptionForm} from "@/app/utils/formUtils";
import { useTransactionService , useInsertTransaction } from "../../../../lib/calledAPI/service/serviceApiTransaction";

type CartItem = {
	id_product: number;
	name: string;
	price: number;
	qty: number;
	barcode: string;
};


export default  function TransactionPage() {
	const [selectedProduct, setSelectedProduct] = useState("");
	const [qty, setQty] = useState(1);
	const [cart, setCart] = useState<CartItem[]>([]);
	const [transaction, setTransaction] = useState<any>({});
	const { data: productsBarcode } = useFetchBarcodeProduct();
	const {register, handleSubmit, reset, setValue, control, formState: {errors}} = useForm<any>();
	const barcodeProduct = productsBarcode?.data || [];
	const insertTransaction = useTransactionService();
	const insertNotaTransaction = useInsertTransaction();

	const updatedBarcode = injectOptionForm(formBarcodeTransaction, "barcode", barcodeProduct.map((item: any) => ({
		label: item.barcode,
		value: item.barcode,
	})) || []);
	const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);



	 const onSubmit = async (data: any) => {
		const selectedBarcode = data.transactionBarcode;
		const qtyInput = data.qty; 
		
		// Use the previously fetched barcodeProduct to find the full product
		// @ts-ignore
		const selectedProduct = barcodeProduct.find(p => p.barcode === selectedBarcode);
	
		const qtyProduct = selectedProduct?.qty || 0;
		if (qtyInput > qtyProduct) {
		  toast.error(`Transaksi Gagal, Stok ${selectedProduct?.name} sisa ${qtyProduct}`);
		  return;
		}
		
		if (!selectedProduct) {
		  toast.error("Produk tidak ditemukan");
		  return;
		}
	  
		const productToAdd = {
		  id_product: selectedProduct.id_product,
		  name: selectedProduct.name,
		  price: selectedProduct.selling_price,
		  barcode : selectedProduct.barcode,
		  qty: Number(data.qty),
		};
	  
		setCart(prev => {
		  const exist = prev.find(p => p.id_product === productToAdd.id_product);
		  if (exist) {
			return prev.map(p =>
			  p.id_product === productToAdd.id_product ? { ...p, qty: p.qty + productToAdd.qty } : p
			);
		  }
		  return [...prev, productToAdd];
		});
	  
		toast.success("Produk ditambahkan ke keranjang");
		reset(); // optional: reset fo
		
	};

	const handleRemove = (id: number) => {
		setCart((prev) => prev.filter((item) => item.id_product !== id));
	};
	const handleTransaction = async () => {
		const total_amount = cart.reduce((sum,item) => sum + item.qty, 0)
		if (cart.length === 0) {
			toast.error("Keranjang kosong, silakan tambahkan produk terlebih dahulu.");
			return;
		}
		try{
			const transactionPayload = {
				transaction: {
					total_price : total,
					total_amount: total_amount,
				},
				transactionItems: cart.map((item) => ({
					id_product: item.id_product,
					barcode: item.barcode,
					product_name: item.name,
					qty: item.qty,
					selling_price: item.price,
				}))
			}
			await insertTransaction.mutateAsync(cart);
			await insertNotaTransaction.mutateAsync(transactionPayload);
			toast.success("Transaksi berhasil dilakukan!");
			setCart([]);
			
		}
		catch (error) {
			toast.error("Transaksi gagal, silakan coba lagi.");
		}
	}

	return (
		<LayoutComponent title={""} subTitle={"Home / POS"}>
                    <header className="px-20 pt-10">
                        <h1 className="text-black font-bold text-2xl"> Penjualan</h1>
                        <p className="text-gray-500">Preferensi Supplier dan Pengaturan</p>
                    </header>
            
			<div className="px-32 py-10 text-black mx-auto">
				{/* Product Selection */}
				<div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-col md:flex-row md:items-end gap-4">

					<div>
						<form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-4">
							<FormRenderer
							// @ts-ignore
								formData={updatedBarcode}
								register={register}
								control={control}
								errors={errors}
								gridClassname="grid grid-cols-1 md:grid-cols-6 gap-4"
							/>
							<Button
								title="Tambah Keranjang"
								type="submit"
								className="flex items-center justify-center"
							/>
						</form>
					</div>
				</div>
				{/* Cart List */}
				<div className="bg-white rounded-xl shadow p-6 mb-8">
					<h2 className="text-lg font-semibold mb-4">Keranjang</h2>
					{cart.length === 0 ? (
						<p className="text-gray-500">Belum ada produk ditambahkan.</p>
					) : (
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Barcode
									</th>
									<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Produk
									</th>
									<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Qty
									</th>
									<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Harga
									</th>
									
									<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Subtotal
									</th>
									<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Aksi
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{cart.map((item) => (
									<tr key={item.id_product}>
										<td className="px-4 py-2 whitespace-nowrap">
											{item.barcode}
										</td>
										<td className="px-4 py-2 whitespace-nowrap">
											{item.name}
										</td>
										<td className="px-4 py-2 whitespace-nowrap">
											{item.qty}
										</td>
										<td className="px-4 py-2 whitespace-nowrap">
											Rp {item.price.toLocaleString()}
										</td>
										<td className="px-4 py-2 whitespace-nowrap font-bold">
											Rp {(item.price * item.qty).toLocaleString()}
										</td>
										<td className="px-4 py-2 whitespace-nowrap text-right">
											<button
												className="text-red-600 hover:text-red-900 text-xs"
												onClick={() => handleRemove(item.id_product)}
											>
												Hapus
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}

					<div className="flex justify-between items-center mt-10">
						<div className="text-lg font-semibold">
							Total:{" "}
							<span className="text-green-600 font-bold">
								Rp {total.toLocaleString()}
							</span>
						</div>
						<Button
							className=" text-white font-semibold px-6 py-2 rounded-lg transition"
							onClick={handleTransaction}
							// disabled={cart.length === 0}
							type="submit"
							title="Selesaikan Transaksi"
						/>
					</div>
				</div>
			
			</div>
		</LayoutComponent>
	);
}