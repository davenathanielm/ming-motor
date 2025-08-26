import { option, span } from "framer-motion/client";
import CurrencyInput from "../currency/currencyInput";
import { Product } from "../../../../models/productModel/productModel";

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
        spanClass :"col-span-2",
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

    // {
    //     name :"status",
    //     label :"Status",
    //     type :"radio",
    //     spanClass :"col-span-1 ",
    //     options : ["Terima", "Tolak"],
    //     required : true,
    // },
    
   
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

export const formUpdateProduct = [
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
        spanClass :"col-span-2",
        required : true,
    },
    
    {
        name :"id_category",  //THIS must match your API key
        label :"Kategori",
        type :"select",
        placeholder :"Select Category",
        spanClass :"col-span-2",
        options: [],
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

export const formDataUpdateProduct = [
    {
        name :"id_supplier",  //THIS must match your API key
        label :"Supplier",
        type :"select",
        placeholder :"pilih supplier",
        spanClass :"col-span-1",
        options: [],
        required : true,
    },
    {
        name :"id_inventory",  //THIS must match your API key
        label :"Gudang",
        type :"select",
        placeholder :"pilih gudang",
        spanClass :"col-span-1",
        options: [],
        required : true,
    },
    {
        name :"qty",
        label :"Jumlah Barang",
        type :"number",
        placeholder :"angka",
        spanClass :"col-span-2",
        required : true,
    },
]

export const formDataSupplier = [
    {
        name :"supplier_name",
        label :"Nama Supplier",
        type :"text",
        placeholder : "masukkan nama supplier",
        spanClass :"col-span-2",
        required : true,
    },
        
    {
        name :"phone_number",
        label :"No Telepon",
        type :"text",
        placeholder : "masukkan no telepon supplier",
        spanClass :"col-span-1",
        required : true,
    },
    // {
    //     name :"address",
    //     label :"Alamat",
    //     type :"text",
    //     placeholder : "masukkan alamat supplier",
    //     spanClass :"col-span-2",
    //     required : true,
    // },
    {
        name :"city",
        label :"Kota",
        type :"text",
        placeholder : "masukkan kota supplier",
        spanClass :"col-span-1",
        required : true,
    },
    {
        name : "comment",
        label :"Catatan",
        type :"text",
        placeholder :"masukkan catatan Supplier",
        spanClass :"col-span-2",
        required : false,
    }

]

export const formDataInventory = [
    {
        name :"location",
        label :"Lokasi Gudang",
        type :"text",
        placeholder : "masukkan lokasi gudang",
        spanClass :"col-span-2",
        required : true,
    },
        
    {
        name :"description",
        label :"Deskripsi",
        type :"text",
        placeholder : "masukkan deskripsi gudang",
        spanClass :"col-span-2",
        required : false,
    },

]

export const formDataCategory = [
    {
        name :"category_name",
        label :"Nama Kategori",
        type :"text",
        placeholder : "masukkan nama kategori produk",
        spanClass :"col-span-2",
        required : true,
    },
        
    {
        name :"description",
        label :"Deskripsi kategori ",
        type :"text",
        placeholder : "masukkan deskripsi kategori produk",
        spanClass :"col-span-2",
        required : false,
    },

]

export const formDataProfile = [
    {
        name :"fullName",
        label :"Nama",
        type :"text",
        placeholder : "masukkan nama",
        spanClass :"col-span-1",
        required : true,
    },
        
    {
        name :"phone_number",
        label :"Nomer telepon",
        type :"text",
        placeholder : "masukkan nomer telepon",
        spanClass :"col-span-1",
        required : true,
    },

    {
        name :"username",
        label :"Username",
        type :"text",
        placeholder : "masukkan username",
        spanClass :"col-span-1",
        required : true,
        readOnly : true,
    },

    {
        name :"email",
        label :"Email",
        type :"text",
        placeholder : "masukkan email",
        spanClass :"col-span-1",
        required : false,
    }
]


export const formVerifyPassword = [
    {
        name :"password",
        label :"Password",
        type :"password",
        placeholder : "masukkan password",
        spanClass :"col-span-2",
        required : true,
    },
]

export const formUpdateUsername = [
    {
        name :"username",
        label :"Username",
        type :"text",
        placeholder : "masukkan username",
        spanClass :"col-span-2",
        required : true,
    },
]

export const formUpdatePassword = [
    {
        name :"password",
        label :"Password",
        type :"password",
        placeholder : "masukkan password baru",
        spanClass :"col-span-2",
        required : true,
    },

    {
        name: "confirmPassword",
        label: "Konfirmasi Password",
        type: "password",
        spanClass: "col-span-2",
        placeholder: "masukkan konfirmasi password",
        required: true,
        validateWithWatchField: "password", 
    },
]

export const formLogin = [
    {
        name :"username",
        label :"Username",
        type :"text",
        placeholder : "masukkan username anda",
        spanClass :"col-span-2",
        required : true,
    },

    {
        name: "password",
        label: "Password",
        type: "password",
        spanClass: "col-span-2",
        placeholder: "masukkan password anda",
        required: true,
    },
]

export const formRegister = [  

    {
        name :"username",
        label :"Username",
        type :"text",
        placeholder : "masukkan username anda",
        spanClass :"col-span-2",
        required : true,
    },

    {
        name :"fullName",
        label :"Nama Lengkap",
        type :"text",
        placeholder : "masukkan nama lengkap anda",
        spanClass :"col-span-1",
        required : true,
    },

    {
        name :"phone_number",
        label :"Nomer Telepon",
        type :"text",
        placeholder : "masukkan nomer telepon anda",
        spanClass :"col-span-1",
        required : true,
    },

    {
        name: "password",
        label: "Password",
        type: "password",
        spanClass: "col-span-2",
        placeholder: "pastikan password anda unik",
        required: true,
        validateWithWatchField: "password", 
    },
]

export const formDataEmployee= [
    {
        name :"full_name",
        label :"Nama Lengkap",
        type :"text",
        placeholder : "masukkan nama lengkap anda",
        spanClass :"col-span-2",
        required : true,
    },

    {
        name :"phone",
        label :"Nomer Telepon",
        type :"text",
        placeholder : "masukkan nomer telepon pegawai",
        spanClass :"col-span-1",
        required : true,
    },

    {
        name :"address",
        label :"Alamat Lengkap",
        type :"text",
        placeholder : "masukkan alamat lengkap pegawai",
        spanClass :"col-span-1",
        required : true,
    },

    {
        name :"position",
        label :"Posisi",
        type :"select",
        options : ["staff", "admin" , "owner"],
        placeholder : "masukkan posisi pegawai",
        spanClass :"col-span-2",
        required : true,
    },

    {
        name :"join_date",
        label :"Tanggal Pegawai Masuk",
        type :"date",
        placeholder : "",
        spanClass :"col-span-2",
        required : true,
    },
]

export const formDataUpdateStatus = [
     {
        name :"status",
        label :"Status",
        type :"select",
        spanClass :"col-span-1 ",
        options : ["Diterima", "Ditolak"],
        required : true,
    },
]

export const formBarcodeTransaction = [
     {
        name :"transactionBarcode",
        label :"Barcode",
        type :"combobox",
        spanClass :"col-span-5 ",
        required : true,
        options : [],
    },
    {
        name :"qty",
        label :"Qty",
        type :"number",
        spanClass :"col-span-1 ",
        required : true,
    },
] 


export const getStatusColor = (status:string) => {
    switch (status) {
        case "Disetujui":
            return "bg-green-300 text-green-900 font-bold p-2 rounded-2xl text-center";
        case "Ditolak":
            return "bg-red-300 text-red-900 font-bold p-2 rounded-2xl text-center";
        default:
            return "bg-yellow-300 text-yellow-900 font-bold p-2 rounded-2xl text-center";
    }
};


// information
// 1. name MUST SAME WITH database name and match API KEY
