import React from "react";
import "./header.scss";

const Header = (props) => (
  <div className="">
    <nav className="navbar-expand-lg">
      <h4>
        <span>Decentralized Identifier Flow</span>{" "}
      </h4>
    </nav>
    <div className="box">
      <div className="box-1"></div>
      <div className="box-2">
        <div className="crosshair"></div>
      </div>
    </div>
  </div>
);

export default Header;
