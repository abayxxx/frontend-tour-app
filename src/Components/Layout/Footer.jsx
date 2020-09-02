import React from "react";
import logo from "../../assets/leaf.png";

export default function Footer() {
  return (
    <div className="container-footer">
      <footer className="Footer">
        <div className="text-center">
          <p className="text-center">
            Copyright @ 2020 Dewe Tour - Your Name - NIS. All Rights reserved
          </p>
        </div>
      </footer>
      <img src={logo} className="FooterI" alt="logo footer" />
    </div>
  );
}
