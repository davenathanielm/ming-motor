import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { profilePicture } from "../items/image";

type Props = {
    title: any,
    subTitle :any
    username : any
}
export default function Topbar({title,subTitle , username} : Props){
    return(
        <div className="flex bg-white gap-2 items-center p-4 sticky right-0 border-b-1">
            <div className="py-1 px-2 border-2 rounded-lg shadow-md hover:shadow-lg">
                <FontAwesomeIcon 
                icon={faBars}
                className="text-black w-5"
            />
            </div>

            {/* <h1 className="text-black font-bold text-lg ml-5">Dashboard</h1> */}

            <header className="">
                <h1 className="text-black font-bold text-2xl ">{title ?? ""}</h1>
             </header>
                <p className="text-black text-sm font-bold">{subTitle ?? ""}</p>
            
            {/* Search Bar */}
{/*             
            <div className="ml-10 p-3 rounded-lg border-2 w-96 shadow-md hover:shadow-lg flex gap-4">
                <FontAwesomeIcon 
                    icon={faMagnifyingGlass}
                    className="text-black/50 w-4"/> 
                <p className="text-black/50 text-sm">Cari atau perintahkan sesuatu</p> 
            </div> */}
            

            <div className="flex ml-auto items-center">

                <div className="rounded-full border-2 py-1 px-2 mr-5">
                     <FontAwesomeIcon
                        icon={faBell}
                        className="text-black/70 text-xl"
                    />
                </div>

                <div className="border-2 rounded-full hover:shadow-lg">
                    {/* <FontAwesomeIcon
                        icon={faBell}
                        className="text-black/70 w-4"
                    /> */}
                    <Image
                        src={profilePicture.image}
                        alt=""
                        className="rounded-full w-8"
                    />
                </div>
                <p className=" text-gray-700 text-sm ml-1 mr-4 ">{username || "Guest"}</p>
                
            </div>
        </div>
    );
}