import { UseFormRegister,FieldErrors, FieldValues, Path} from "react-hook-form";

interface Field {
    name: string;
    label: string;
    type: "text"|"number"|"select"|"file";
    placeholder?: string;
    spanClass?: string;
    required?: boolean;
    options?: string[]; // for select form
}

interface Props <T extends FieldValues> {
    formData : Field[];
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    gridClassname?: string;
}


export default function FormRenderer<T extends FieldValues>({ 
    formData, 
    register,
    errors, 
    gridClassname, 
}: Props<T>){
    return (
        <div className={gridClassname}>
            {formData.map((item) =>(
                <div className={item.spanClass} key={item.name}>
                    <label htmlFor={item.name} className="block text-black text-sm mb-1">
                        {item.label} {item.required? <span className="text-red-500 text-sm">* wajib diisi</span> : <span>(optional)</span> }
                    </label>
                    {/* Error Message */}
                    {item.type === "select"?(
                        <select id={item.name} 
                            {...register(item.name as Path<T>, {required: item.required})}
                            className=" w-full p-2 rounded-sm bg-gray-100 border-1 border-gray-300 shadow-sm text-black"
                        >
                            <option value="">-- Pilih {item.label} --</option>
                            {item.options?.map((option) =>(
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ):(
                        <input
                            id = {item.name}
                            type={item.type}
                            placeholder={item.placeholder}
                            {...register(item.name as Path<T>,{ 
                                    required: item.required,
                                    valueAsNumber: item.type === "number"? true : false,
                                })}
                                className = "w-full p-2  rounded-sm bg-gray-100 border-1 border-gray-300"
                            />
                    )} 
                    {errors[item.name as keyof T]&&(
                        <span className="text-red-500 text-sm mt-1">
                            {item.label} wajib diisi
                        </span>
                    )}
                </div>
            ))}
        </div>    
    );
}

// information:
// useForm need register to track the input value and error thats why use ...register to tell the form name field that needed to be tracked
// As Path <T> is for tell typescript that these item.name is a part of T object 
// export default function FormRenderer<T extends FieldValues> it means these function use generic and flexible so when T string then the formData is string too, if T is number then the formData is number too
// Props <T> function for matches with interface and make sure type same with the Props <T>