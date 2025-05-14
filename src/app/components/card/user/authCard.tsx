"use client";
import LayoutComponent from "@/app/components/layout/layoutComponent";
import { Children, useState } from "react";
import { User } from "../../../../../models/userModel/userModel";
import Modal from "@/app/components/modal/modal";
import { toast } from "sonner";
import Image, { StaticImageData } from "next/image";

type AuthProps = {
    children: React.ReactNode;
    imageSrc: StaticImageData;
    imageAlt: any;
}

export default function AuthLayout({children , imageSrc, imageAlt} : AuthProps) {
    return(
        <div className="flex justify-center items-center min-h-screen px-6">
            <div className="flex bg-white shadow-xl rounded-2xl overflow-hidden max-w-3xl w-full">
                {/* Image Section */}
                <div className="w-[600px] h-[450px] relative">
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-cover rounded-2xl"
                        />
                </div>

                {/* Form Section */}
                <div className="flex flex-col justify-center p-10 w-full text-black">
                    {children}
                </div>
            </div>
        </div>
    );
};