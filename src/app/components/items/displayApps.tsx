import { displayAppsImage } from "./menuIcon"
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
import { MdSpaceDashboard, MdQrCodeScanner} from "react-icons/md";
import { FaTruck } from "react-icons/fa";
import { FaBox, FaUserTie, FaBook, FaWarehouse  } from "react-icons/fa6";
import { FaCashRegister } from "react-icons/fa6";
import { BiSolidCategoryAlt } from "react-icons/bi";

export const displayProductApps = [
    {
        icon : FaBox,
        text: "Produk",
        link : "/product/productPage",
        iconCoba : faBoxesStacked,
    }
    ,
    {
        icon: FaTruck,
        text: "Supplier",
        link: "/supplier",
        iconCoba : faTruck
    },
    {
        icon: BiSolidCategoryAlt,
        text: "Kategori",
        link: "/product/category",
        iconCoba : faBoxesStacked
    },
    {
        icon: FaWarehouse,
        text: "Gudang",
        link:"/inventory",
        iconCoba : faWarehouse
    },
    {
        icon: MdQrCodeScanner,
        text: "Scanner",
        link:"/product/barcodeProduct",
        iconCoba : faBarcode
    },
    {
        icon: FaCashRegister,
        text: "Transaksi",
        link:"/transaction",
        iconCoba : faCashRegister
    },
]

export const displayAllApps = [
    {
        text: "Dashboard",
        iconCoba : faHouse,
        icon : MdSpaceDashboard,
        link : "/dashboard"
    },
    {
        text: "Produk",
        iconCoba : faBoxesStacked,
        icon: FaBox,
        link : "/product"
    }
    ,
    {
        iconName : "employee",
        iconCoba : faUserTie,
        icon : FaUserTie,
        text: "Pegawai",
        link: "/employee"
    },
    {
        iconCoba : faBook,
        icon : FaBook,
        text: "Laporan",
        link: "/summary"
    },
    {
        icon: MdQrCodeScanner,
        text: "Scanner",
        link:"/product/barcodeProduct",
        iconCoba : faBarcode
    },
    {
        iconCoba : faCashRegister,
        icon : FaCashRegister,
        image: displayAppsImage.scanner,
        text: "Transaksi",
        link:"/transaction",
    },
]