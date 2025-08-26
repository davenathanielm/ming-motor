import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { profilePicture } from "../items/menuIcon";
import Button from "../items/button";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { menuTopbar } from "../items/menuIcon";
import { IoLogOut } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { useFetchNotification } from "../../../../lib/calledAPI/service/serviceApiNotification";
import { Notification } from "../../../../models/notificationModel/notificationModel";
import { useUpdateLastSeenNotification } from "../../../../lib/calledAPI/service/serviceApiNotification";
import { useFetchCountNotificationUnread } from "../../../../lib/calledAPI/service/serviceApiNotification";


type Props = {
    title: any,
    subTitle :any
    username : any
    userId:any
    onToggleMenu: () => void;
}
export default function Topbar({title,subTitle , username = "Guest", userId ,onToggleMenu} : Props){
    const {data : notificationData} = useFetchNotification(userId)
    const countNotif = notificationData?.count || 0; // Assuming count is part of the notification data
    const notifications = notificationData?.notification || [];
    const mutationUpdateSeenNotification = useUpdateLastSeenNotification();
    console.log("Notification Data yang ada :", notificationData);
    
    const handleLogout = () =>{
        signOut({ redirect: true, callbackUrl: "/auth/login" }); // Log out and redirect to login page
    }
    const handleNotification = () => {
        mutationUpdateSeenNotification.mutate();  
    }

    return(
        <div className="flex bg-white/50 gap-2 items-center py-2 px-10 sticky right-0 border-2 z-30">

            {/* toggle */}
            <div 
                onClick={onToggleMenu} 
                className="py-1 px-2 border-2 bg-customBackgroundButton rounded-lg shadow-md hover:shadow-lg cursor-pointer hover:bg-customBackgroundButton/70"
            >
                <FontAwesomeIcon icon={faBars} className="text-white w-5"/>
            </div>


            {/* Navigation*/}
            <header className="">
                <h1 className="text-black font-bold text-2xl ">{title ?? ""}</h1>
            </header>
            <p className="text-customBackgroundButton text-sm font-semibold">{subTitle ?? ""}</p>
        
            {/* Notification + profile */}
            <div className="flex ml-auto items-center">
                
                <div className="mr-10 text-sm">
                    <Link href={"/displayApps"}>
                        <Button title="Menu Utama" />
                    </Link>
                </div>
                
                {/* <div className=" mr-3">
                     <FontAwesomeIcon
                        icon={faBell}
                        className="text-customBackgroundButton/90 text-xl hover:cursor-pointer hover:text-customBackgroundButton/70"
                    />
                </div> */}

                <div className="flex flex-col p-2 border-customBackgroundButton rounded-lg">
                    <div className="flex items-center gap-2">
                        {/* <Image
                            src={profilePicture.image}
                            alt=""
                            className="rounded-full w-9"
                        /> */}
                        {/* <div className="flex border border-customMainBackground rounded-lg items-center py-2 px-3 text-customBackgroundButton">
                            <p className=" text-sm font-semibold">{username}</p>    
                            <svg className="ml-1 -mr-1 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg> 
                        </div> */}


                        {/* notification dropdown */}
                        <Menu as="div" className="relative inline-block text-left text-customBackgroundButton ">
                            <MenuButton className=" inline-flex items-center justify-between mr-3 font-semibold text-sm rounded-lg">
                                <FontAwesomeIcon
                                    icon={faBell}
                                    className="text-customBackgroundButton/90 text-xl hover:cursor-pointer hover:text-customBackgroundButton/70"
                                    onClick={handleNotification}
                                />
                            </MenuButton>
                            <MenuItems className="absolute right-0 mt-1 mb-2 w-80 bg-white rounded-xl shadow-xl z-10 max-h-96 overflow-y-auto scrollbar-hide">
                                {notificationData?.length === 0 ? (
                                    <div className="px-4 py-6 text-center text-gray-500 text-sm">No notifications</div>
                                ) : (
                                    notifications.map((item: Notification) => (
                                    <MenuItem key={item.id_notification}>
                                        <div className="w-full px-4 py-3 hover:bg-gray-100 cursor-pointer transition-all duration-150 border-b-2"
                                            >
                                            <div className="flex items-start">
                                                {/* Optional icon */}
                                                {/* <BellIcon className="h-5 w-5 text-gray-500 mt-1" /> */}
                                                <div className="flex flex-col">
                                                    <p className="text-sm font-medium text-gray-800">{`${item.fullName} ${item.message}`}</p>
                                                    {/* Optional timestamp */}
                                                    <span className="text-xs text-gray-400 mt-1">
                                                        {new Date(item.date).toLocaleString()} {/* or format with date-fns */}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                </MenuItem>
                                ))
                                )}
                            </MenuItems>
                        </Menu>


                        {/* username dropdown */}
                        <Menu as="div" className="relative inline-block text-left text-customBackgroundButton w-full">
                            <MenuButton className=" inline-flex items-center justify-between w-full px-2 py-2 font-semibold text-sm rounded-lg border-2 border-customBackgroundButton hover:border-customLightGreen/60 transition">
                                {username}
                                <svg
                                    className="ml-1 h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </MenuButton>
                            <MenuItems className="absolute right-0 mt-1 mb-2 w-52 bg-white rounded-lg shadow-lg z-10">
                            {menuTopbar.map((item) => (
                                <MenuItem key={item.name}>
                                    <Link href={item.link}>
                                        <div className={`block px-4 py-4 text-sm text-left w-full ${item.rounded} hover:bg-gray-300`}>
                                            <div className="flex items-center gap-4">
                                                <item.icon className=" text-gray-600" />
                                                {item.name}
                                            </div>
                                        </div>
                                    </Link>
                                </MenuItem>
                            ))}
                                <MenuItem>
                                    <button className={`block px-4 py-4 text-sm text-left w-full rounded-b-lg hover:bg-gray-300 `}
                                        onClick={handleLogout}
                                    >
                                        <div className="flex items-center gap-4">
                                            <FiLogOut className=" text-gray-600" />
                                            Logout
                                        </div>
                                    </button>
                                </MenuItem>

                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    );
}