import menu from '../../../../public/images/menuIcon/menu.png';
import menuColor from '../../../../public/images/menuIcon/menuColor.png';
import profileUser from '../../../../public/images/menuIcon/profileUser.png';
import profileUserColor from '../../../../public/images/menuIcon/profileUserColor.png';
import pieChart from '../../../../public/images/menuIcon/pieChart.png';
import pieChartColor from '../../../../public/images/menuIcon/pieChartColor.png';
import table from '../../../../public/images/menuIcon/table.png';
import product from '../../../../public/images/menuIcon/box.png';
import tableColor from '../../../../public/images/menuIcon/tableColor.png';
import checklist from '../../../../public/images/menuIcon/checklist.png';
import checklistColor from '../../../../public/images/menuIcon/checklistColor.png';
import notification from '../../../../public/images/menuIcon/notification.png';
import profilePic from '../../../../public/images/team/team-05.png';
import barcode from '../../../../public/images/product/barcode.png';
import bin from '../../../../public/images/product/bin.png';
import info from '../../../../public/images/product/info.png';
import pen from '../../../../public/images/product/pen.png';
import boxLine from '../../../../public/images/product/boxLine.png';
import boxNormal from '../../../../public/images/product/boxNormal.png';
import categoriesColor from '../../../../public/images/product/categoriesColor.png';
import deliveryMan from '../../../../public/images/product/deliveryMan.png';
import postman from '../../../../public/images/product/postman.png';
import qrCode from '../../../../public/images/product/qr-code.png';
import scanner from '../../../../public/images/product/scanner.png';
import warehouse from '../../../../public/images/product/warehouse.png';
import warehouseBlue from '../../../../public/images/product/warehouseBlue.png';
import warehouse1 from '../../../../public/images/auth/warehouse1.jpeg';
import warehouse2 from '../../../../public/images/auth/warehouse2.jpeg';
import warehouse3 from '../../../../public/images/auth/warehouse3.jpeg';
import warehouse4 from '../../../../public/images/auth/warehouse4.jpeg';
import { VscGraph, VscPackage, VscChecklist, VscPieChart, VscAccount } from "react-icons/vsc";

const menuIcon = [
    {
        name :"dashboard",
        title :"Dashboard",
        image: menu,
        icon : VscGraph,
        link:"dashboard",
        hidden : ""
    },
    {
        name :"product",
        title :"Produk",
        image: product,
        icon : VscPackage,
        link : "product",   
        hidden : ""
    },
    {
        name :"employee",
        title :"Pegawai",
        image: checklist,
        icon : VscChecklist,
        link : "employee",
        hidden : ""
    },
    {
        name : "summary",
        title :"Laporan",
        image: pieChart,
        icon : VscPieChart,
        link : "summary",
        hidden : ""
    },
    // {
    //     name : "notification",
    //     title :"Notification",
    //     image: notification,
    //     link : "notification"
    // },
    {
        name : "profile",
        title :"User Profile",
        image: profileUser,
        icon : VscAccount,
        link : "user"
    }
];

const profilePicture = {
    image: profilePic
};

const barcodeImage = {
    barcode1: barcode
};

const productIcon = {
    bin: bin,
    info: info,
    pen: pen
};

export const displayAppsImage = {
    boxLine : boxLine,
    boxNormal : boxNormal,
    categoriesColor : categoriesColor,
    deliveryMan : deliveryMan,
    postman : postman,
    qrCode : qrCode,
    scanner : scanner,
    warehouse : warehouse,
    warehouseBlue : warehouseBlue,
}

export const authImage = {
    warehouse1 : warehouse1,
    warehouse2 : warehouse2,
    warehouse3 : warehouse3,
    warehouse4 : warehouse4
}

export {menuIcon , profilePicture , barcodeImage , productIcon};