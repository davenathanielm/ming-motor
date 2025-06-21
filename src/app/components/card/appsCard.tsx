import Image from "next/image";
import Link from "next/link";
import Icon from "../Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type AppsCardProps = {
  title?: string;
  image?: any; // Prefer string if you're using imported static images or external links
  text?: string;
  link?: string;
  iconName?: any;
  iconCoba ?: any;
};

export default function AppsCard({ title, image, text, link, iconName , iconCoba }: AppsCardProps) {
  console.log("icon coba : " , iconCoba )
  return (
    <Link href={link || "#"} className="block text-black hover:opacity-50 transition">
      <div className="flex items-center gap-4 bg-white shadow-md rounded-xl border-1 border-gray-200 p-5">
        {/* {image && ( */}
          {/* <Image
            src={image}
            alt={title || "App Image"}
            width={50}
            height={50}
            className="w-12 h-12 object-contain"
          /> */}
        {/* )} */}


        {/* @ts-ignore */}
        {/* <Icon name={iconName} className="w-10 h-10 text-blue-500 mb-2" /> */}

      {iconCoba && (
  <FontAwesomeIcon icon={iconCoba} className="text-4xl text-customMainBackground" />
)}
            
        <div className="flex flex-col">
          {/* <h2 className="text-lg font-semibold">{title}</h2> */}
          <p className="text-sm text-black font-semibold">{text}</p>
        </div>
      </div>
    </Link>
  );
}
