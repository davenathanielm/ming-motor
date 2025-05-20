import { currencyFormat } from "../components/items/date";
export const roleFilterOwner =  (role?: string) => role ==="owner"; //implicitly return true

export const displayPrice = (role : string, price :number) =>{
    if (!roleFilterOwner(role)) return "***************";
    return currencyFormat(price);
}
