"use client";
import { Combobox } from "@headlessui/react";
import { useState, useEffect } from "react";
import { SelectOption } from "@/app/utils/formUtils";

interface FormComboboxProps {
  label?: string;
  name: string;
  value: SelectOption | null;
  options: SelectOption[];
  placeholder?: string;
  onChange: (value: SelectOption | null) => void;
  disabled?: boolean;
}

export default function FormCombobox({
  label,
  name,
  value,
  options,
  placeholder = "Cari data...",
  onChange,
  disabled = false,
}: FormComboboxProps) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<SelectOption | null>(value);
  const [isOpen, setIsOpen] = useState(false); // 👈 manually control open

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label?.toLowerCase().includes(query.toLowerCase())
        );

  useEffect(() => {
    setSelected(value);
    setQuery(value?.label ?? "");
  }, [value]);

  const handleSelect = (option: SelectOption) => {
    setSelected(option);
    onChange(option);
    setQuery(option.label);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <input
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => {
          const input = e.target.value;
          setQuery(input);
          setIsOpen(true); // 👈 open when typing
          const match = options.find((opt) =>
            opt.label.toLowerCase() === input.toLowerCase()
          );
          onChange(match ?? { label: input, value: input });
        }}
        value={query}
        onFocus={() => {
          setIsOpen(true); // 👈 open on focus
        }}
        onBlur={() => {
          // Close dropdown after slight delay to allow click selection
          setTimeout(() => setIsOpen(false), 100);
        }}
        placeholder={placeholder}
        disabled={disabled}
      />

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              onMouseDown={(e) => e.preventDefault()} // prevent blur
              onClick={() => handleSelect(option)}
              className={`cursor-pointer px-4 py-2 hover:bg-blue-600 hover:text-white ${
                selected?.value === option.value ? "bg-blue-100" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {isOpen && filteredOptions.length === 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white py-2 px-4 text-sm text-gray-500 shadow ring-1 ring-black ring-opacity-5">
          Tidak ditemukan
        </div>
      )}
    </div>
  );
}
