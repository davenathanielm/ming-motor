"use client";
import LayoutComponent from "@/app/components/layout/layoutComponent";
import AppsCard from "@/app/components/card/appsCard";
import { displayAllApps, displayProductApps } from "@/app/components/items/displayApps";

export default function DisplayAllApps(){
    return (
        <LayoutComponent title={""} subTitle={"Home / All Apps"}>
            <div className="flex flex-col min-h-scren gap-6 text-center px-48 py-20">
                <header>
                    <h1 className="text-black font-bold text-2xl">Menu Utama</h1>
                    <p className="text-gray-500">Akses menu dengan mudah dan cepat</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayAllApps.map ((app,index) =>(
                        <AppsCard
                            key = {index}
                            // @ts-ignore
                            title = {app.title}
                            image = {app.image}
                            text = {app.text}
                            link = {app.link}
                            iconName = {app.iconName}
                            iconCoba={app.iconCoba}
                        />
                    ))}
                </div>
            </div>    
        </LayoutComponent>
    )
}