import { displayAppsImage } from "./image"
import Icon from "../Icons"
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faBarcode } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { faBoxesStacked } from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { faCashRegister } from "@fortawesome/free-solid-svg-icons";

export const displayProductApps = [
    {
        image: displayAppsImage.boxNormal,
        text: "Produk",
        link : "/product/productPage",
        iconCoba : faBoxesStacked
    }
    ,
    {
        image: displayAppsImage.postman,
        text: "Supplier",
        link: "/supplier",
        iconCoba : faTruck
    },
    {
        image: displayAppsImage.categoriesColor,
        text: "Kategori",
        link: "/product/category",
        iconCoba : faBoxesStacked
    },
    {
        image: displayAppsImage.warehouseBlue,
        text: "Gudang",
        link:"/inventory",
        iconCoba : faWarehouse
    },
    {
        image: displayAppsImage.scanner,
        text: "Scanner",
        link:"/product/barcodeProduct",
        iconCoba : faBarcode
    },
    {
        image: displayAppsImage.scanner,
        text: "Transaksi",
        link:"/transaction",
        iconCoba : faCashRegister
    },
]

export const displayAllApps = [
    {
        image: displayAppsImage.boxNormal,
        text: "Dashboard",
        iconCoba : faHouse,
        link : "/dashboard"
    },
    {
        image: displayAppsImage.boxNormal,
        text: "Produk",
        iconCoba : faBoxesStacked,
        link : "/product"
    }
    ,
    {
        // image: displayAppsImage.postman,
        iconName : "employee",
        iconCoba : faUserTie,
        text: "Pegawai",
        link: "/employee"
    },
    {
        image: displayAppsImage.categoriesColor,
        iconCoba : faBook,
        text: "Laporan",
        link: "/summary"
    },
    {
        // image: displayAppsImage.warehouseBlue,
        iconName : "book",
        iconCoba : faUser,
        text: "Profile",
        link:"/user"
    },
    // {
    //     image: displayAppsImage.scanner,
    //     text: "Scanner",
    //     iconCoba : faBarcode,
    //     link:"/product/barcodeProduct"
    // },

    {
        image: displayAppsImage.scanner,
        text: "Transaksi",
        link:"/transaction",
        iconCoba : faCashRegister
    },
]