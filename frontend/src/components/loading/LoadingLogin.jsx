import React from "react";

export default function LoadingLogin() {
  return (
    <div style={{ textAlign: "center", marginTop: "300px" }}>
      <img src="../../img/loadinglogin.gif" alt="Loadinglogin..." width={50} />
      <span className="ms-2">Login ...</span>
    </div>
  );
}
