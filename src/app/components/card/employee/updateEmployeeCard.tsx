import { Employee } from "../../../../../models/employeeModel/employeeModel";
import {useForm} from "react-hook-form";
import { useUpdateEmployee } from "../../../../../lib/calledAPI/service/serviceApiEmployee";
import { useFetchEmployeeById } from "../../../../../lib/calledAPI/service/serviceApiEmployee";
import { formDataEmployee } from "../../items/formTemplate";
import FormRenderer from "../../items/formRender";
import { toast } from "sonner";
import { useEffect } from "react";
import Button from "../../items/button";

type Props = {
    employee: Employee;
    onClose: () => void;
}

export default function UpdateEmployeePage({ employee, onClose }: Props) {
    const {register, handleSubmit, reset, setValue, control, formState: {errors}} = useForm<Employee>();
    // const {data: employeeData} = useFetchEmployeeById(employee.id);
    const mutationUpdateEmployee = useUpdateEmployee(employee.id);
    console.log("ini id yang diupdate", employee );

    useEffect(()=>{
       if(employee){
            reset(employee);
        }
    },[employee,reset]);

    const onSubmit = async(data: Employee) => {
        console.log("pegawai yang dimasukkan adalah: ", data);
        try{
            await mutationUpdateEmployee.mutateAsync(data);
            toast.success("Pekerja berhasil diupdate");
            onClose();
        }
        catch(error){
            toast.error("Gagal mengupdate pekerja");
        }
    }

    return(
        <div className="text-black">
            <h2 className="text-xl font-bold mb-4">Update Pekerja</h2>
            <div className="mt-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormRenderer<Employee> 
                    // @ts-ignore
                        formData={formDataEmployee} 
                        register={register} 
                        control={control} 
                        errors={errors} 
                        setValue={setValue} 
                        gridClassname="grid gap-5"/>

                    <div className="flex justify-end gap-6 mt-10">
                        <Button title="Batal" onClick={reset} variant="delete"/>
                        <Button title="Simpan" type="submit" variant="submit"/>
                        {/* <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer">Simpan</button> */}
                    </div> 
                </form>
            </div>
        </div>
    );
}