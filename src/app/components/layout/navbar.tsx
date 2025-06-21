"use client";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { menuIcon } from "../items/image";
import Button from "../items/button";
import { signOut } from "next-auth/react";

type Props = {
  onToggleMenu: () => void;
  role : string;
};

export default function Navbar({ onToggleMenu , role }: Props) {
  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/auth/login" }); // Log out and redirect to login page
  };

  //@ts-ignore 
  const updatedMenuIcon = useMemo(() =>{
    return menuIcon.map((item) => {
      if (item.name === "employee" && role !== "owner") {
        return { ...item, hidden: "hidden" };
      }
      if (item.name === "summary" && role !== "owner") {
        return { ...item, hidden: "hidden" };
      }
      return item;
    });
  })

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h1 className="text-2xl font-bold text-black">Ming Motor</h1>
          <button
            onClick={onToggleMenu}
            className="py-1 px-2 bg-customBackgroundButton text-white rounded-lg border-2 shadow-md hover:shadow-lg hover:bg-customBackgroundButton/70"
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={faXmark} className="w-5" />
          </button>
        </div>

        {/* Section Title */}
        <p className={`pl-5 mt-4 text-xs font-semibold text-black/50`}>MENU</p>

        {/* Menu Items */}
        <nav className="mt-2 flex flex-col gap-3 px-2">
          {updatedMenuIcon.map((item) => (
            <div className= {item.hidden } key={item.title}>
              <Link href={`/${item.link}`} key={item.title} passHref>
                <div className={`flex items-center gap-4 py-3 px-4 rounded-lg hover:bg-gray-300 transition cursor-pointer `}>
                  {/* <Image src={item.image} alt={item.title} width={18} height={18} /> */}
                  <item.icon className="text-[20px] text-gray-800" />
                  <span className={`text-sm font-medium text-gray-800`}>
                    {item.title}
                  </span>
                </div>
              </Link>
            </div>
          ))}
          
        </nav>

      </div>
      <p className="text-black">
        <Button
          title="Logout"
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-4 mt-auto "
        />
      </p>
    </div>
  );
}

