import CurrencyInput from "../currency/currencyInput";

export const formDataProduct = [
    {
        name :"barcode",
        label :"Barcode",
        type :"text",
        placeholder :"scan barcode...",
        spanClass :"col-span-2",
        required : true,
    },
  
    {
        name :"name",
        label :"Nama Produk",
        type :"text",
        placeholder :"text",
        spanClass :"col-span-1",
        required : true,
    },
    
    {
        name :"qty",
        label :"Jumlah Barang",
        type :"number",
        placeholder :"angka",
        spanClass :"col-span-1",
        required : true,
    },
    
    {
        name :"id_category",  //THIS must match your API key
        label :"Kategori",
        type :"select",
        placeholder :"Select Category",
        spanClass :"col-span-1",
        options: [],
        required : true,
    },
  
    {
        name :"id_supplier",  //THIS must match your API key
        label :"Supplier",
        type :"select",
        placeholder :"Select Supplier",
        spanClass :"col-span-1",
        options: [],
        required : true,
    },

    {
        name :"id_inventory",  //THIS must match your API key
        label :"Inventory",
        type :"select",
        placeholder :"Select Inventory",
        spanClass :"col-span-1",
        options: [],
        required : true,
    },

    // {
    //     name :"brand",
    //     label :"Merk",
    //     type :"select",
    //     placeholder :"Select Brand",
    //     spanClass :"col-span-1",
    //     required : false,
    //     options : []
    // },

    {
        name :"status",
        label :"Status",
        type :"radio",
        spanClass :"col-span-1 ",
        options : ["Terima", "Tolak"],
        required : true,
    },
    
   
    {
        name :"hpp",
        label :"Harga Pokok Penjualan",
        type :"custom",
        customComponent: CurrencyInput,
        placeholder :"angka",
        spanClass :"col-span-1",
        reqired : false,
    },
    
    {
        name :"selling_price",
        label :"Harga Jual",
        type :"custom",
        customComponent: CurrencyInput,
        placeholder :"angka",
        spanClass :"col-span-1",
        required : true,
    },

    
    
    {
        name :"description",
        label :"Deskripsi Produk",
        type :"text",
        placeholder :"deskripsi produk  ",
        spanClass :"col-span-2",
        reqired : false,

    },
]

export const getStatusColor = (status:string) => {
    switch (status) {
        case "Terima":
            return "bg-green-300 text-green-900 font-bold p-2 rounded-2xl text-center";
        case "Tolak":
            return "bg-red-300 text-red-900 font-bold p-2 rounded-2xl text-center";
        default:
            return "bg-gray-300 text-gray-900 font-bold p-2 rounded-2xl text-center";
    }


};

// information
// 1. name MUST SAME WITH database name and match API KEY
