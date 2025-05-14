import { displayAppsImage } from "./image"

export const displayApps = [
    {
        title : "Product",
        image: displayAppsImage.boxNormal,
        text: "Product",
        link : "/product/productPage"
    }
    ,
    {
        image: displayAppsImage.postman,
        text: "Supplier",
        link: "/supplier"
    },
    {
        image: displayAppsImage.categoriesColor,
        text: "Category",
        link: "/product/category"
    },
    {
        image: displayAppsImage.warehouseBlue,
        text: "Inventory",
        link:"/inventory"
    },
    {
        image: displayAppsImage.scanner,
        text: "Scanner",
        link:"/product/barcodeProduct"
    },
]