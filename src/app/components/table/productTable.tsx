import { Product } from "../../../../models/productModel/productModel";
import DataTable, {TableColumn} from "react-data-table-component";

// Define table columns
export const Productcolumns: TableColumn<Product>[] = [
  { 
    name: "Nama", 
    selector: (row) => row.name, 
    sortable: true, 
    // minWidth: "200px",
    cell: (row) => <div className="whitespace-normal break-words text-center">{row.name}</div>
  },
  { 
    name: "Jumlah", 
    selector: (row) => row.qty, 
    sortable: true,
    minWidth : "50px" 
  },
  { 
    name: "Brand", 
    selector: (row) => row.brand, 
    sortable: true 
  },
  { 
    name: "HPP", 
    selector: (row) => `Rp ${row.hpp.toFixed(2)}`, 
    sortable: true 
  },
  { 
    name: "Harga Jual", 
    selector: (row) => `Rp ${row.selling_price.toFixed(2)}`, 
    sortable: true
  },
  { 
    name: "Barcode", 
    selector: (row) => row.barcode 
  },
  { 
    name: "Deskripsi", 
    selector: (row) => row.description , 
    cell : (row) => <div className="whitespace-normal break-words text-center">{row.description}</div> 
  },

  { 
    name: "Tanggal Dibuat", 
    selector: (row) => new Date (row.created_at).toLocaleDateString() 
  },
  { 
    name: "Status", 
    selector: (row) => row.status, 
    sortable: true, cell: (row) => <div className="bg-green-300  text-green-900 font-bold p-1 rounded-2xl text-center">{row.status}</div>
  },
  { 
    name: "Action",
    cell : (row) => (
       <div className="flex gap-2">
        <button
          onClick={() => handleUpdate(row)}
          className="px-3 py-1 bg-blue-500 text-white rounded-md">
          Update
        </button>
        {/* <button
          onClick={() => handleDelete(row)}
          className="px-3 py-1 bg-red-500 text-white rounded-md"
        >
          Delete
        </button> */}
      </div>
    )

  },
];

export const handleUpdateProduct = (row: Product) => {
  console.log("Update product:", row);
  // Implement update logic (e.g., open a modal with product details)
};
