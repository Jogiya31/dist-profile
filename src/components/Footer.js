import React from "react";
import NICSI_logo from "../assets/images/NICSI_logo.svg";
import NIC_logo from "../assets/images/NIC_logo.svg";

const Footer = () => {
  return (
    <>
      {/* Footer container */}
      <div className="flex justify-between page-footer ">
        {/* NIC Logo */}
        <div className="mx-4">
          <img src={NIC_logo} alt="NIC Logo" />
        </div>
        {/* Text content */}
        <div className="mx-5">
          <p className="mb-0 text-center">
            {/* Prayas description */}
            Prayas has been developed under the guidance of Prime Minister’s
            office with inputs from Departments.
            <br />
            {/* Platform information */}
            The Platform is designed and developed by Data Analytics (DA) Informatics Division, NIC and Centre of
            Excellence for Data Analytics(CEDA), NICSI.
          </p>
        </div>
        {/* NICSI Logo */}
        <div className="mx-4">
          <img src={NICSI_logo} alt="NICSI Logo" />
        </div>
      </div>
    </>
  );
};

export default Footer;