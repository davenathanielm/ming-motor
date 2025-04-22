import { UseFormRegister,FieldErrors, FieldValues, Path, Control, Controller} from "react-hook-form";
import { ComponentType } from "react";
import { SelectOption } from "@/app/utils/formUtils";

interface Field {
    name: string;
    label: string;
    type: "text"|"number"|"select"|"file" | "radio" | "custom";
    placeholder?: string;
    spanClass?: string;
    required?: boolean;
    options?: SelectOption[]; // for select form
    customComponent?: ComponentType<{ 
        value : number; 
        onChange : ( value: number) => void;
    }>;
}

interface Props <T extends FieldValues> {
    formData : Field[];
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    control: Control<T>
    gridClassname?: string;
}


export default function FormRenderer<T extends FieldValues>({ 
    formData, 
    register,
    errors, 
    control,
    gridClassname, 
}: Props<T>){
    return (
        <div className={gridClassname}>
            {formData.map((item) =>(
                <div className={item.spanClass} key={item.name}>

                    {/* this is for custom label */}
                    {item.type === "radio"?(
                        <label htmlFor={item.name} className="block text-black text-sm mb-3">
                            {item.label} {item.required? <span className="text-red-500 text-sm">*</span> : <span>(optional)</span> }
                        </label>

                    ):(
                        <label htmlFor={item.name} className="block text-black text-sm mb-[6px]">
                            {item.label} {item.required? <span className="text-red-500 text-sm">*</span> : <span>(optional)</span> }
                        </label>
                    )}
                    
                    
                    {/* Error Message */}
                    {item.type === "select"?(
                        <select id={item.name} 
                            {...register(item.name as Path<T>, {required: item.required})}
                            className=" w-full p-2 rounded-xl bg-gray-100 border-1 border-gray-300 shadow-sm text-sm"
                        >
                            <option value="">-- Pilih {item.label} --</option>
                            {item.options?.map((option) =>(
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ): item.type === "radio"?(
                        <div className="flex gap-4">
                            {item.options?.map((option) =>(
                                <label key={option} className="flex items-center text-base gap-1">
                                    <input 
                                        type ="radio"
                                        value={option}
                                        {...register(item.name as Path<T>, {required: item.required})}
                                    />
                                    {option}
                                </label>
                            ))}

                        </div> 
                    ):  item.type === "custom" && item.customComponent?(
                            <Controller
                                name = {item.name as Path<T>}
                                control = {control}
                                rules={{ required: item.required }}
                                render = {({field}) => (
                                   <item.customComponent value={field.value || 0} onChange={field.onChange} />
                                )}
                            />
                    ):
                    (
                        <input
                            id = {item.name}
                            type={item.type}
                            placeholder={item.placeholder}
                            {...register(item.name as Path<T>,{ 
                                    required: item.required,
                                    valueAsNumber: item.type === "number"? true : false,
                                })}
                                className = "w-full p-[10px] rounded-xl bg-gray-100 border-1 border-gray-300 text-sm"
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