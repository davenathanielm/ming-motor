import {menuIcon} from "../items/menuImage";
import Image from "next/image";
import Link from "next/link";


export default function Navbar(){
    return(
        <div className="flex min-h-screen h-screen  bg-white flex-col border-r-2">
            <h1 className= "text-black font-bold text-2xl px-5 py-5">Ming Motor</h1>
            <p className="pl-5 text-[12px] text-black/50 my-3">MENU</p>
            <div className="text-black flex flex-col gap-6 w-full">
                {menuIcon.map((item)=>(
                    <Link href={"/"+ item.link} key={item.title} >
                        <div className=" hover:bg-amber-200 transition duration-100 rounded-lg cursor-pointer hover:opacity-100 w-full pl-6 pr-20">
                            <div className="flex rounded-lg py-3 items-center gap-5 opacity-80 ">
                                <Image 
                                    src={item.image}
                                    alt=""
                                    width={18}
                                    className=""
                                />
                                <h1 className="text-black/90 font-bold text-sm"> {item.title} </h1>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}