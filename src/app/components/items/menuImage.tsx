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

const menuIcon = [
    {
        title :"Dashboard",
        image: menu,
        link:"dashboard"
    },
    {
        title :"Produk",
        image: product,
        link : "product"

    },
    {
        title :"User Profile",
        image: profileUser,
        link : "user"

    },
    {
        title :"Laporan",
        image: pieChart,
        link : "summary"
    },
    {
        title :"Notification",
        image: notification,
        link : "notification"

    },
    {
        title :"Team",
        image: checklist,
        link : "team"
    }
];

const profilePicture = {
    image: profilePic
};



export {menuIcon , profilePicture};