
export const formDataProduct = [
    {
        name :"barcode",
        label :"Barcode",
        type :"text",
        placeholder :"Scan Barcode...",
        spanClass :"col-span-2 ",
        required : true,
    },
    
    {
        name :"name",
        label :"Nama Produk",
        type :"text",
        placeholder :"Product Name",
        spanClass :"col-span-1",
        required : true,
    },

    {
        name :"qty",
        label :"Jumlah Barang",
        type :"number",
        placeholder :"Quantity",
        spanClass :"col-span-1",
        required : true,
    },
    
    {
        name :"category",
        label :"Kategori",
        type :"select",
        placeholder :"Select Category",
        spanClass :"col-span-1",
        options: [],
        required : true,
    },

    {
        name :"brand",
        label :"Merk",
        type :"select",
        placeholder :"Select Brand",
        spanClass :"col-span-1",
        required : false,
        options : []
    },
    
   
    {
        name :"hpp",
        label :"Harga Pokok Penjualan",
        type :"number",
        placeholder :"HPP Produk",
        spanClass :"col-span-1",
        reqired : false,
    },
    
    {
        name :"selling_price",
        label :"Harga Jual",
        type :"number",
        placeholder :"Price",
        spanClass :"col-span-1",
        required : true,
    },
    
    {
        name :"description",
        label :"Deskripsi Produk",
        type :"text",
        placeholder :"Deskripsi Produk  ",
        spanClass :"col-span-2",
        reqired : false,

    },
]
