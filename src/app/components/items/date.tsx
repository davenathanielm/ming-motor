 export const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
};

export const currencyFormat = (value: number) =>new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(value);