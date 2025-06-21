import { Transaction_items } from "../../../../../models/transactionModel/transactionModel";
import { currencyFormat, formatDate } from "../../items/date";
import { useFetchTransactionItems } from "../../../../../lib/calledAPI/service/serviceApiTransaction";

type Props = {
    id: any;
    role?: string;
}
export default function TransactionDetailCard({ id, role }: Props) {
    const{data: transactionItems, isLoading} = useFetchTransactionItems(id);
    const transactionItemsSafety = transactionItems || [];
    console.log("data transaction items", transactionItemsSafety.data);
    return (
        <div className="overflow-x-auto mt-4 rounded-lg border border-gray-300">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Barcode</th>
              <th className="px-4 py-3">Nama Produk</th>
              <th className="px-4 py-3">Qty</th>
              <th className="px-4 py-3">Harga Jual</th>
              <th className="px-4 py-3">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {transactionItemsSafety.map((item: Transaction_items, index: number) => (
              <tr
                key={item.id_transaction_items}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{item.barcode}</td>
                <td className="px-4 py-3">{item.product_name}</td>
                {/* @ts-ignore*/}
                <td className="px-4 py-3">{item.quantity}</td>
                <td className="px-4 py-3">{currencyFormat(item.selling_price)}</td>
                <td className="px-4 py-3">{currencyFormat(item.subtotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}