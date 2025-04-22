// design table
export const customStyles = {
    rows: {
      style: {
        minHeight: "60px", // override the row height
        justifyContent: "center",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "13px",
        justifyContent: "center",
       
      },
    },
    cells: {
      style: {
        justifyContent: "center",
        whiteSpace: " normal",
        wordWrap: "break-word",
    
      },
    },
  }

  // this is for change format currency
  export const formatCurrency = (value : number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
    }).format(value);

  }
