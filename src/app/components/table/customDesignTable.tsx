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
        // backgroundColor: "#eff1f5",
        fontSize: "13px",
        justifyContent: "center",
       borderTop: "1px solid #E5E7EB",
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
