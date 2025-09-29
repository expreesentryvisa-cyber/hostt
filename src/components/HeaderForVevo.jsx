import React from "react";
import "../VevoHeader.css";
import govLogo from "../logo-Photoroom2.png"; // replace with your logo path

const VevoHeader = () => {
  return (
    <div className="vevo-header-bar">
      {/* Left side: Logo + Department text */}
      <div className="vevo-header-left">
        <img src={govLogo} alt="Government Logo" className="vevo-logo" />
      </div>

      {/* Right side: Help + Title */}
      <div className="vevo-header-right">
        <div className="vevo-help">
          <a href="#">Help [on]</a>
        </div>
        <div className="vevo-title">VEVO for Visa Holders</div>
      </div>
    </div>
  );
};

export default VevoHeader;
