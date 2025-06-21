import Cart from '../assets/icons/user-solid.svg';
import Home from '../assets/icons/house-solid.svg';
import Employee from '../assets/icons/user-tie-solid.svg';
import Book from '../assets/icons/book-solid.svg';

const icons = {
    cart : Cart,
    home : Home,
    employee : Employee,
    book : Book,
}

export type IconName = keyof typeof icons;

interface IconProps extends React.SVGProps<SVGSVGElement> {
    name: IconName;
    className?: string;
}

export default function Icon({ name, className = "", ...props }: IconProps) {
    const SvgIcon = icons[name];
    if(!SvgIcon) return null;

    return <SvgIcon className={className} {...props} />;
}