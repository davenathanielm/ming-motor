import Image from "next/image";
import Link from "next/link";

type AppsCardProps = {
  title?: string;
  image?: any; // Prefer string if you're using imported static images or external links
  text?: string;
  link?: string;
};

export default function AppsCard({ title, image, text, link }: AppsCardProps) {
  return (
    <Link href={link || "#"} className="block text-black hover:opacity-50 transition">
      <div className="flex items-center gap-4 shadow-md rounded-xl border-1 border-gray-200 p-5">
        {image && (
          <Image
            src={image}
            alt={title || "App Image"}
            width={50}
            height={50}
            className="w-12 h-12 object-contain"
          />
        )}
        <div className="flex flex-col">
          {/* <h2 className="text-lg font-semibold">{title}</h2> */}
          <p className="text-sm text-black font-semibold">{text}</p>
        </div>
      </div>
    </Link>
  );
}
