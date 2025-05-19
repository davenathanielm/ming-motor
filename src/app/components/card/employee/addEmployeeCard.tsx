import { Employee } from "../../../../../models/employeeModel/employeeModel";
import {useForm} from "react-hook-form";
import { useInsertEmployee } from "../../../../../lib/calledAPI/service/serviceApiEmployee";
import { formDataEmployee } from "../../items/formTemplate";
import FormRenderer from "../../items/formRender";
import { toast } from "sonner";
import Button from "../../items/button";

export default function AddEmployeePage() {
    const {register, handleSubmit, reset, setValue, control, formState: {errors}} = useForm<Employee>();
    const mutationInsertEmployee = useInsertEmployee();

    const onSubmit = async(data: Employee) => {
        console.log("pegawai yang dimasukkan adalah: ", data);
        try{
            await mutationInsertEmployee.mutateAsync(data);
            toast.success("Pekerja berhasil ditambahkan");
            reset();
        }
        catch(error){
            toast.error("Gagal menambahkan pekerja");
        }
    }

    return(
        <div className="text-black">
            <h2 className="text-xl font-bold mb-4">Tambah Pekerja</h2>
            <div className="mt-6">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormRenderer<Employee> 
                    // @ts-ignore
                        formData={formDataEmployee} 
                        register={register} 
                        control={control} 
                        errors={errors} 
                        setValue={setValue} 
                        gridClassname=" grid gap-5"/>

                    <div className="flex justify-end gap-6 mt-10">
                        <Button title="Batal" variant="delete" onClick={reset}/>
                        <Button title="Simpan" type="submit" variant="submit"/>
                        {/* <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer">Simpan</button> */}
                    </div> 
                </form>
            </div>
        </div>
    );
}