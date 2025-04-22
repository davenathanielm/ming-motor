import Link from "next/link";
import { Product } from "../../../../models/productModel/productModel";
import DataTable, {TableColumn} from "react-data-table-component";
import { getStatusColor } from "../items/formTemplate";
import { formatCurrency } from "./customDesignTable";

// Define table columns
export const Productcolumns = (
    onUpdate : (id:any) => void,
    onDelete : (id:any , name : string) => void,
    onDetail : (product : Product) =>void
) : TableColumn<Product>[] => [
  { 
    name: "No", 
    cell: (row, index) => <div className="whitespace-normal break-words text-center">{index+1}</div>
  },
  { 
    name: "Barcode", 
    selector: (row) => row.barcode 
  },
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
    name: "HPP", 
    cell: (row) => formatCurrency(row.hpp),
    selector: (row) => Number(row.selling_price),
    sortable: true 
    
  },
  { 
    name: "Harga Jual", 
    cell: (row) => formatCurrency(row. selling_price),
    selector: (row) => Number(row.selling_price),
    sortable: true
  },
  
  { 
    name: "Tanggal Dibuat", 
    selector: (row) => new Date (row.created_at).toLocaleDateString() 
  },
  { 
    name: "Status", 
    selector: (row) => row.status, 
    sortable: true, cell: (row) => <div className={getStatusColor(row.status)}>{row.status}</div>
  },
  { 
    name: "Action",
    cell : (row) => (
       <div className="flex gap-2">
        <button
          onClick={() => onUpdate(row.id_product)}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:cursor-pointer">
          Update
        </button>
        <button
          onClick={() => onDelete(row.id_product , row.name)}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:cursor-pointer">
          Delete
        </button>
        {/* <button
          onClick={() => onDetail(row)}
          className="px-3 py-1 bg-green-500 text-white rounded-md hover:cursor-pointer">
          Detail
        </button> */}
      </div>
    )

  },
];


// information 
// 1. name : This sets the header for the column and will be shown as the column title at the top of the table.
// 2. selector: (row) => row.name : This tells the table which data to use from each row (your data item), row.name pulls the name property from your Product object. and it uses for inside filter and sort
// 3. sortable: true : This allows the column to be sortable when clicked. It will sort the data based on the selector value (in this case, row.name).   
// 4. cell: (row) => <div className="whitespace-normal break-words text-center">{row.name}</div> : This is a custom cell renderer. It allows you to customize how the data is displayed in the spesific cell or row . In this case, it wraps the name in a div with specific styling to handle long text and center it.

// Table Information
// 1. export const Productcolumns = (onUpdate: (id:number) => void) : TableColumn<Product>[] => [value]
//  - it means  function Productcolumns will accept a parameter onUpdate which is a function.
//  - function onUpdate accept argument id: number in it and return void or nothing
//  - these function Productcolumns accept TableColumn<Product>[] as parameter so return type would be array and the return value must be match with TableColumn and Product

// 3. in productTable we use router and prepare router to be used in productTable also create function handleUpdate that contain routes and send to productTable
// 4. we sent handleUpdate to productTable and will be called in productTable and in productTable id_product will be passed to handleUpdate function
//    and will be used in router.push from ProductPage to go to the updateProduct page with id_product as a parameter
