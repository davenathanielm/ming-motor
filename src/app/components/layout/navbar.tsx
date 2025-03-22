import {menuIcon} from "../items/menuImage";
import Image from "next/image";
import Link from "next/link";


export default function Navbar(){
    return(
        <div className="flex min-h-screen h-screen  bg-white flex-col border-r-2">
            <h1 className= "text-black font-bold text-2xl px-5 py-5">Ming Motor</h1>
            <p className="pl-5 text-[12px] text-black/50 my-3">MENU</p>
            <div className="text-black ml-6 mr-12 flex flex-col gap-6 w-full">
                {menuIcon.map((item)=>(
                    <Link href={"/"+ item.link} key={item.title} >
                        <div className="flex rounded-lg px-5 py-3 w-60 items-center gap-5 opacity-80 hover:opacity-100 hover:bg-amber-200 transition cursor-pointer">
                            <Image 
                                src={item.image}
                                alt=""
                                width={18}
                                className=""
                            />
                            <h1 className="text-black/90 font-bold text-sm"> {item.title} </h1>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}