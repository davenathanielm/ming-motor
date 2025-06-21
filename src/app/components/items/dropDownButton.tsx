// components/StatusDropdownButton.tsx
import { useState } from "react";

export default function StatusDropdownButton({ onSelect }: { onSelect: (status: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (status: string) => {
    onSelect(status);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-center items-center w-full rounded-md bg-customBackgroundButton hover:bg-customBackgroundButton/80 px-4 py-2 text-sm font-bold text-white "
      >
        Ubah Status
        <svg className="ml-2 -mr-1 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2  w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="">
            <button
              onClick={() => handleSelect("Disetujui")}
              className="block w-full px-4 py-2 text-left text-sm text-black hover:bg-gray-100"
            >
              Diterima
            </button>
            <button
              onClick={() => handleSelect( "Ditolak")}
              className="block w-full px-4 py-2 text-left text-sm text-black hover:bg-gray-100"
            >
              Ditolak
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
