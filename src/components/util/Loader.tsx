import { useContext } from "react";
import { SideBarStatusContext } from "../../Layout";

const Loader = () => {
  const open: any = useContext(SideBarStatusContext);

  const imageStyle = {
    width: "150px",
    height: "150px",
    animation: "spin 1s linear infinite",
  };

  return (
    <div
      style={{
        height: "92vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      {open && (
        <>
          {" "}
          <img
            src="https://res.cloudinary.com/ddlhk5yje/image/upload/v1705917787/hashx/hashx_bkm3wo.png" // Replace with the actual path to your image
            alt="Loading..."
            style={imageStyle}
          />
          <style>
            {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
          </style>
          <p style={{ fontSize: "14px", marginTop: "10px",color:"white" }}>Loading...</p>
        </>
      )}
    </div>
  );
};

export default Loader;
