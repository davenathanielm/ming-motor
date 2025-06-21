"use client";

import LayoutComponent from "@/app/components/layout/layoutComponent";
import AppsCard from "@/app/components/card/appsCard";
import { displayProductApps } from "@/app/components/items/displayApps";

export default function DisplayProductPage() {
  return (
    // @ts-ignore
    <LayoutComponent title={""} subTitle={"Home / Product"}>
      <div className="flex flex-col min-h-screen gap-6 text-center px-48 py-20">
        {/* <h1 className="text-2xl font-bold text-center text-black">
          Choose Your Apps
        </h1> */}

        <header className="mb-4">
          <h1 className="text-black font-bold text-2xl">Pilih Menu Produk</h1>
          <p className="text-gray-500 text-sm">Menu untuk mengatur produk </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProductApps.map((app, index) => (
            <AppsCard
              key={index}
              image={app.image}
              text={app.text}
              link={app.link}
              iconCoba={app.iconCoba}
            />
          ))}
        </div>
      </div>
    </LayoutComponent>
  );
}
