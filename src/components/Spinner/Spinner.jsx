import React from "react";
import "./Spinner.css";

function Spinner() {
  return (
    <>
      <div className="flex w-screen h-screen justify-center items-center">
        <div className="loader"></div>
      </div>
    </>
  );
}

export default Spinner;

// import React from "react";
// import { Bars } from "react-loader-spinner";

// function Spinner({ height = 80, width = 80, color = "#0C1E40" }) {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         background:
//           "linear-gradient(135deg, rgba(2, 1, 1, 0), rgba(1, 2, 2, 0))",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           borderRadius: "50%",
//           boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
//           background: "rgba(255, 255, 255, 0.8)",
//           height: height + 20,
//           width: width + 20,
//           padding: 20,
//           boxSizing: "border-box",
//           animation: "pulse 1.5s infinite",
//         }}
//       >
//         <Bars
//           height={height}
//           width={width}
//           color={color}
//           ariaLabel="bars-loading"
//           wrapperStyle={{}}
//           wrapperClass=""
//           visible={true}
//         />
//       </div>
//     </div>
//   );
// }

// export default Spinner;
