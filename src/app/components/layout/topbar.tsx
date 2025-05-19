import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { profilePicture } from "../items/image";

type Props = {
    title: any,
    subTitle :any
    username : any
    onToggleMenu: () => void;
}
export default function Topbar({title,subTitle , username = "Guest" ,onToggleMenu} : Props){
    return(
        <div className="flex bg-white/50 gap-2 items-center py-4 px-10 sticky right-0 border-2 z-30">
            
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
            <p className="text-customBackgroundButton text-sm  font-semibold">{subTitle ?? ""}</p>
        
            {/* Notification + profile */}
            <div className="flex ml-auto items-center">

                <div className=" mr-6">
                     <FontAwesomeIcon
                        icon={faBell}
                        className="text-customBackgroundButton text-xl hover:cursor-pointer hover:text-customBackgroundButton/70"
                    />
                </div>

                <div className="flex items-center p-2 border border-customBackgroundButton rounded-lg">
                    {/* <div className="border-2 rounded-full hover:shadow-lg">
                        <Image
                            src={profilePicture.image}
                            alt=""
                            className="rounded-full w-8"
                        />
                    </div> */}
                    <p className=" text-customBackgroundButton text-sm font-semibold ">{username}</p> 
                </div>
            </div>
        </div>
    );
}