'use client';
import LayoutComponent from "@/app/components/layout/layoutComponent";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { useFetchDashboardSummary } from "../../../../lib/calledAPI/service/serviceApiDashboard";
import { formatCurrency } from "@/app/components/table/customDesignTable";
import { detailSupplierColumns } from "@/app/components/table/detailSupplierTable";
import DataTable from "react-data-table-component";
import { useFetchTransactionToday } from "../../../../lib/calledAPI/service/serviceApiTransaction";
import { useFetchSupplierSummaryToday } from "../../../../lib/calledAPI/service/serviceApiSupplier";
import BarChartComponent from "@/app/components/chart/dashboardChart";
import { SupplierSummary } from "../../../../models/detail_supplier/detail_supplier";
import { Transaction } from "../../../../models/transactionModel/transactionModel";
import { customStyles } from "@/app/components/table/customDesignTable";
import Modal from "@/app/components/modal/modal";
import SupplierSummaryCard from "@/app/components/card/supplier/supplierSummaryCard";
import { summaryTransactionColumns } from "@/app/components/table/summaryTransaction";
import TransactionDetailCard from "@/app/components/card/transaction/transactionDetailCard";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const {data : dashboardSummary, isLoading} = useFetchDashboardSummary();
  const {data : summarySupplier, isLoading : supplierLoading} = useFetchSupplierSummaryToday();
  const {data : summaryTransaction, isLoading : transactionLoading} = useFetchTransactionToday();

  const suppliers = summarySupplier || [];
  const transactions = summaryTransaction || [];
    const [searchSummary, setSearchSummary] = useState("");
    const [searchTransaction, setSearchTransaction] = useState("");
    const [selectedSupplier, setSelectedSupplier] = useState<SupplierSummary | null>(null);
    const [selectedTransaction, setSelectedTransaction] = useState<any >(null);

  const filteredData = suppliers?.filter((item :SupplierSummary) =>
      [item.barcode ?? "", item.city ?? "", item.name ?? "", item.phone_number ?? "", item.supplier_name ?? ""]
        .some((field) => field.toLowerCase().includes(searchSummary.toLowerCase()))
  );

  const filteredDataTransaction = transactions?.filter((item :Transaction) =>
      [item.payment_method ?? "", item.invoice_number ?? ""]
        .some((field) => field.toLowerCase().includes(searchTransaction.toLowerCase()))
  );
  
   if (isLoading || !dashboardSummary) {
    return (
      <LayoutComponent title={``} subTitle={`Home`}>
        <div className="px-14 py-10">
          <h1 className="text-black font-bold text-2xl">Loading dashboard...</h1>
        </div>
      </LayoutComponent>
    );
  }

  const handleDetailSupplier = (supplier:SupplierSummary) => {
    setSelectedSupplier(supplier);
  }

  const handleDetailTransaction = (transaction:Transaction) => {
    setSelectedTransaction(transaction.id_transaction);
  }

  return (
    // @ts-ignore
    <LayoutComponent title={``} subTitle={`Home`}>
      <div className="px-14 pt-10 mb-10">

        <header className="mb-10">
          {/* @ts-ignore */}
            <h1 className="text-black font-bold text-2xl">{`Welcome Back ${session?.user?.username}`}</h1>
            <p className="text-gray-500">Grab ur coffe and start working!</p>
        </header>         
        {dahshboardCard(dashboardSummary)}
        <div className=" mt-16">
          <h1 className="text-black font-bold text-2xl mb-5 text-center">Stock Hari Ini</h1>
            <div className="rounded-xl shadow-md overflow-hidden text-black bg-white mt-3 border border-gray-300">
              <DataTable
              columns={detailSupplierColumns(handleDetailSupplier)}
              data={filteredData}
              pagination
              highlightOnHover
              striped
              persistTableHead
              defaultSortFieldId={1}
              // @ts-ignore
              customStyles={customStyles}
              subHeader
              subHeaderComponent={
                <input
                    type="text"
                    placeholder="Cari laporan..."
                    className="p-2 w-1/4 my-3 border border-gray-300 text-black rounded-lg"
                    value={searchSummary}
                    onChange={(e) => setSearchSummary(e.target.value)}
                  />
                }
              />
            </div>

        <h1 className="text-black font-bold text-2xl mb-5 mt-10 text-center">Transaksi Hari Ini</h1>
        <div className="rounded-xl shadow-md overflow-hidden text-black bg-white mt-3 border border-gray-300">
          <DataTable
           columns={summaryTransactionColumns(handleDetailTransaction)}
           data={filteredDataTransaction}
           pagination
           highlightOnHover
           striped
           persistTableHead
           defaultSortFieldId={1}
           // @ts-ignore
           customStyles={customStyles}
           subHeader
           subHeaderComponent={
             <input
                 type="text"
                 placeholder="Cari laporan..."
                 className="p-2 w-1/4 my-3 border border-gray-300 text-black rounded-lg"
                 value={searchTransaction}
                 onChange={(e) => setSearchTransaction(e.target.value)}
               />
             }
          />
        </div>

        </div>

         <Modal isOpen = {!!selectedSupplier} onClose={() => setSelectedSupplier(null)}>
                {selectedSupplier && <SupplierSummaryCard supplierSummary={selectedSupplier} />}
        </Modal>
         <Modal isOpen = {!!selectedTransaction} onClose = { () => setSelectedTransaction(null)}>
                      {selectedTransaction && <TransactionDetailCard id={selectedTransaction}/>}
          </Modal>
      </div>
    </LayoutComponent>
  );  
}


function dahshboardCard (dashboardSummary: any) {
  return (
    <div className="flex gap-4 text-black">
      {/* @ts-ignore */}
      {cardComponent(dashboardSummary).map((item, index)=>(
        <div key={index} className="bg-white/80 shadow-md rounded-lg p-4 flex-1">
          <h2 className="text-base font-semibold">{item.title}</h2>
          <p className="text-gray-500 my-1 text-sm">{item.description}</p>
          <p className="font-semibold text-customGreen text-lg mt-7">{item.content}</p>
        </div>
      ))}
    </div>
  )
}

function cardComponent(dashboardSummary:any) { return [
  {
    title : "Stok Barang",
    description : "total jumlah stok barang hari ini",
    content : dashboardSummary.totalProduct?.value ?? "0"
  },
  {
    title : "Pembelian Barang",
    description : "total pembelian stok hari ini",
    content : formatCurrency(dashboardSummary?.totalBuy?.value) || "Rp. 0"
  },
  {
    title : "Jumlah Barang ",
    description : "Jumlah barang terjual hari ini",
    content : dashboardSummary?.totalAmount?.value ?? "0"
  },
  {
    title : "Penjualan Barang",
    description : "total penjualan hari ini",
    content : formatCurrency(dashboardSummary?.totalEarning?.value) || "Rp. 0"
  }
] 
}

 {/* Bar Chart */}
        {/* <div className="mt-14 grid grid-cols-2 gap-4 mb-5">
          <div>
            <h1 className="text-black font-bold mb-3">Penjualan</h1>
            <p className="text-black rounded-lg bg-white"><BarChartComponent/></p>
          </div>
          <div>
          <h1 className="text-black font-bold mb-3">Stok</h1>
            <p className="text-black rounded-lg bg-white"><BarChartComponent/></p>
          </div>
        </div> */}