import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
  Control,
  Controller,
  UseFormWatch,
} from "react-hook-form";
import { ComponentType } from "react";
import { SelectOption } from "@/app/utils/formUtils";

interface Field {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "file" | "radio" | "custom" | "password";
  placeholder?: string;
  spanClass?: string;
  required?: boolean;
  options?: SelectOption[] | string[];
  value?: any;
  readOnly?: boolean;
  validate?: (value: any, watch?: UseFormWatch<any>) => string | boolean;
  validateWithWatchField?: string; // NEW
  customComponent?: ComponentType<{
    value: number;
    onChange: (value: number) => void;
  }>;
}

interface Props<T extends FieldValues> {
  formData: Field[];
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  control: Control<T>;
  gridClassname?: string;
  watch?: UseFormWatch<T>;
}

export default function FormRenderer<T extends FieldValues>({
  formData,
  register,
  errors,
  control,
  gridClassname,
  watch,
}: Props<T>) {
  return (
    <div className={gridClassname}>
      {formData.map((item) => {
        const error = errors[item.name as keyof T];

        const validationRules = {
          required: item.required ? `${item.label} wajib diisi` : false,
          valueAsNumber: item.type === "number" ? true : undefined,
          validate:
            item.validateWithWatchField && watch
              ? (value: any) => {
                  const otherValue = watch(item.validateWithWatchField as Path<T>);
                  return (
                    value === otherValue ||
                    `${item.label} harus sama dengan ${item.validateWithWatchField}`
                  );
                }
              : item.validate? (value: any) => item.validate!(value, watch)
              : undefined,
        };

        const renderLabel = () => (
          <label htmlFor={item.name} className="block text-black text-sm mb-[6px]">
            {item.label}{" "}
            {item.required ? (
              <span className="text-red-500 text-sm">*</span>
            ) : (
              <span className="text-gray-400">(optional)</span>
            )}
          </label>
        );

        const inputClass = `w-full p-2 rounded-lg bg-white border border-gray-300 shadow-sm text-sm ${
          item.readOnly ? "bg-gray-200 cursor-not-allowed" : ""
        }`;

        return (
          <div className={item.spanClass} key={item.name}>
            {renderLabel()}

            {item.type === "select" ? (
              <select
                id={item.name}
                {...register(item.name as Path<T>, validationRules)}
                defaultValue={item.value ?? ""}
                disabled={item.readOnly}
                className={inputClass}
              >
                <option value="">-- Pilih {item.label} --</option>
                {(item.options as SelectOption[])?.map((option) =>
                  typeof option === "string" ? (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ) : (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  )
                )}
              </select>
            ) : item.type === "radio" ? (
              <div className="flex gap-4">
                {(item.options as string[])?.map((option) => (
                  <label key={option} className="flex items-center text-base gap-1">
                    <input
                      type="radio"
                      value={option}
                      {...register(item.name as Path<T>, validationRules)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : item.type === "custom" && item.customComponent ? (
              <Controller
                name={item.name as Path<T>}
                control={control}
                rules={validationRules}
                render={({ field }) => (
                  <item.customComponent
                    value={field.value || 0}
                    onChange={item.readOnly ? () => {} : field.onChange}
                    readOnly={item.readOnly}
                  />
                )}
              />
            ) : (
              <input
                id={item.name}
                type={item.type}
                placeholder={item.placeholder}
                readOnly={item.readOnly}
                defaultValue={item.value}
                {...register(item.name as Path<T>, validationRules)}
                className={inputClass}
              />
            )}

            {error && (
              <span className="text-red-500 text-sm mt-1 block">
                {error.message as string}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
