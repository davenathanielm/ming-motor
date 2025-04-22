import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { profilePicture } from "../items/menuImage";

export default function Topbar(){
    return(
        <div className="flex bg-white items-center p-4 sticky right-0">
            <div className="py-2 px-3 border-2 rounded-lg shadow-md hover:shadow-lg">
                <FontAwesomeIcon 
                icon={faBars}
                className="text-black w-5"
            />
            </div>
            
            <div className="ml-10 p-3 rounded-lg border-2 w-96 shadow-md hover:shadow-lg flex gap-4">
                <FontAwesomeIcon 
                    icon={faMagnifyingGlass}
                    className="text-black/50 w-4"/> 
                <p className="text-black/50 text-sm">Cari atau perintahkan sesuatu</p> 
            </div>
            

            <div className="flex ml-auto items-center">

                <div className="rounded-full shadow-md border-2 py-2 px-3 mr-5">
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
                        className="rounded-full w-10"
                    />
                </div>
                <p className=" text-black text-sm ml-3">Dave Nathaniel</p>
                
            </div>
        </div>
    );
}