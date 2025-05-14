"use client";
import LayoutComponent from "@/app/components/layout/layoutComponent"
import DataTable from "react-data-table-component";
import { employeeColumns } from "@/app/components/table/employeeTable";
import { customStyles } from "@/app/components/table/customDesignTable";
import { useFetchEmployee } from "../../../../lib/calledAPI/service/serviceApiEmployee";
import { useDeleteSupplier } from "../../../../lib/calledAPI/service/serviceApiSupplier";
import Link from "next/link";
import Modal from "@/app/components/modal/modal";
import { toast } from "sonner";
import { Employee } from "../../../../models/employeeModel/employeeModel";
import { useState } from "react";
import EmployeeDetailCard from "@/app/components/card/employee/detailEmployeeCard";
import AddEmployeePage from "@/app/components/card/employee/addEmployeeCard";
import UpdateEmployeePage from "@/app/components/card/employee/updateEmployeeCard";
import { useDeleteEmployee } from "../../../../lib/calledAPI/service/serviceApiEmployee";


export default function EmployeePage() {
    const { data: employeeData } = useFetchEmployee();
    const mutationDelete = useDeleteEmployee();
    const[selectedEmployee, setEmployee] = useState<Employee | null>(null);
    const[addedEmployee, setAddedEmployee] = useState<boolean | null>(null);
    const [updatedEmployee , setUpdatedEmployee] = useState<any | null>(null);
const handleUpdate = (employee: Employee) => {
  console.log(employee);
  setUpdatedEmployee(employee);
}
const handleDelete = (id: string, name: string) => {
    try{
        mutationDelete.mutate(id);
        toast.success(`Pekerja ${name} berhasil dihapus`);
    }
    catch(error){
        toast.error(`Pekerja ${name} gagal dihapus`);
    }
}
const handleDetail = (employee: any) => {
  setEmployee(employee);
}

const handleAddEmployee = () => {
    setAddedEmployee(true);
}

    return (
        <LayoutComponent title={``} subTitle={`Home / Employee`} >
         <div className="py-6">
                <div className="flex mb-3 px-2">
                <header>
                    <h1 className="text-black font-bold text-2xl">Daftar Pegawai</h1>
                    <p className="text-gray-500">Tambah dan Ubah data pegawai anda</p>
                </header> 
                    <div className="flex justify-end ml-auto gap-4 items-center">   
                        <button className="px-3 bg-blue-300 text-blue-950 font-bold rounded-lg py-2 hover:cursor-pointer" onClick={handleAddEmployee}>+ Tambah Pegawai</button>
                    </div>
                    {/* <Link href={"/product/addProduct"} >
                        <button className="px-3 bg-blue-300 text-blue-950 font-bold rounded-lg py-2 hover:cursor-pointer">+ Tambah barang</button>
                    </Link> */}
                    {/* <div className="flex justify-end ml-auto gap-4">   
                        <button className="px-3 bg-blue-300 text-blue-950 font-bold rounded-lg py-2 hover:cursor-pointer" onClick={handleAddSupplier}>+ Tambah Supplier</button>
                    </div> */}
                </div>

                <div className="rounded-xl shadow-md overflow-hidden text-black bg-white">
                <DataTable
                    columns={employeeColumns(handleUpdate, handleDelete,handleDetail)}
                    data={employeeData}
                    pagination
                    highlightOnHover
                    striped
                    persistTableHead
                    defaultSortFieldId={1}
                    customStyles={customStyles}
                />
                </div>

                {/* check if selectedProduct = null (falsy) return isOpen false or selectedProduct = Product (thruthy) return isOpen true */}
                <Modal isOpen={!!selectedEmployee} onClose={() => setEmployee(null)}>
                {selectedEmployee && <EmployeeDetailCard employee={selectedEmployee} />}
                </Modal>

                <Modal isOpen ={!!addedEmployee} onClose={() => setAddedEmployee(null)}>
                {addedEmployee && <AddEmployeePage />}
                </Modal>

                <Modal isOpen ={!!updatedEmployee} onClose={() => setUpdatedEmployee(null)}>
                {updatedEmployee && <UpdateEmployeePage employee={updatedEmployee} onClose={()=>setUpdatedEmployee(null)} />}
                </Modal>
            </div>
        </LayoutComponent>
    )
}