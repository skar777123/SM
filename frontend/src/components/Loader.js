import React from "react";

function Loader() {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status"></div>
      <div>
        <p style={{color:"gray"}}>Please wait...</p>
      </div>
    </div>
  );
}

export default Loader;
