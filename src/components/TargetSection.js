import sectionBg from "../assets/images/sectionbg.png";
import target from "../assets/images/target.png";
import upArrow from "../assets/images/w-upArrow.png";
import NA from "../assets/images/NA.png";
import bulb from "../assets/images/bulb.png";
import "../assets/css/TargetSection.css";
import { useState } from "react";

const TargetSection = () => {
  const [toggleTab, setToggleTab] = useState("NA");

  const handleTabClick = (val) => {
    setToggleTab(val);
  };

  const infoCards = [
    {
      scheme: "PM Bhartiya Janaushadhi Pariyojana",
      kpi: "No. of Household Tap Connections",
      presentValue: "34.09 L",
      targetValue: "62.53 L",
      percent: "50.5%",
    },
    {
      scheme: "Jal Jeevan Mission",
      kpi: "No. of Household Tap Connections",
      presentValue: "34.09 L",
      targetValue: "62.53 L",
      percent: "50.5%",
    },
    {
      scheme: "Bharat Net",
      kpi: "No. of Villages Covered",
      presentValue: "34.09 L",
      targetValue: "62.53 L",
      percent: "50.5%",
    },
    {
      scheme: "Agriculture Infrastructure Fund",
      kpi: "Jan Aushadhi Kendra",
      presentValue: "34.09 L",
      targetValue: "62.53 L",
      percent: "50.5%",
    },
    {
      scheme: "Agriculture Infrastructure Fund",
      kpi: "Jan Aushadhi Kendra",
      presentValue: "34.09 L",
      targetValue: "62.53 L",
      percent: "50.5%",
    },
    {
      scheme: "Agriculture Infrastructure Fund",
      kpi: "Jan Aushadhi Kendra",
      presentValue: "34.09 L",
      targetValue: "62.53 L",
      percent: "50.5%",
    },
  ];
  return (
    <div>
      <div className="container-flex bg-primary-bg pb-12">
        <img src={sectionBg} alt="" />
        <div className="custom-container bg-primary-bg card ">
          <div className="target-header flex justify-between bg-customBlue">
            <div className="target-header-left">
              <h2 className="text-2xl text-white font-bold">
                Target / Deliverable
              </h2>
              <img src={target} className="header-logo" alt="" />
            </div>
            <div className="target-header-right">
              <h2 className="text-xl text-white font-bold ">Schemes (27)</h2>
              <img src={upArrow} className="header-logo" alt="" />
            </div>
          </div>
          <div className=" shadow-customShadow rounded mt-4 p-3 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 target-card-section">
            {infoCards.map((info, index) => {
              const logoUrl = `images/schemes/${info.Project_Code}.png`;
              return (
                <div key={index} className="">
                  <div className="target-card">
                    <div className="target-card-header">
                      <div className="flex items-center">
                        <img src={logoUrl} className="logo" alt="" />
                        <h2 className=" ml-2 font-bold">{info.scheme}</h2>
                      </div>
                      <span className="per-achieved text-white">
                        {info.percent} Achieved
                      </span>
                    </div>
                    <div className="target-content grid grid-cols-2 gap-4">
                      <div className="w-full ">
                        <h2 className="font-semibold text-sm mb-1">
                          (Present Value)
                        </h2>
                        <div className="p-2 shadow-customShadow rounded present w-full">
                          <p className="text-gray-600">{info.kpi}</p>
                          <h3 className="text-lg font-semibold">
                            {info.presentValue}
                          </h3>
                        </div>
                      </div>
                      <div className="w-full">
                        <h2 className="font-semibold text-sm mb-1">
                          (Target Value)
                        </h2>
                        <div className="p-2 shadow-customShadow rounded target bg-green-50 ">
                          <p className="text-gray-600">{info.kpi}</p>
                          <h3 className="text-lg font-semibold">
                            {info.targetValue}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="container-flex bg-primary-bg pb-12">
        <img src={sectionBg} alt="" />
        <div className="custom-container insites grid grid-cols-1 sm:grid-cols-[40%_60%] md:grid-cols-[30%_70%] lg:grid-cols-[25%_75%] gap-4">
          <div className="insites-left">
            <div
              className={`tab shadow-customShadow rounded p-5 cursor-pointer font-semibold ${
                toggleTab === "NA" && "bg-customBlue text-white "
              }`}
              onClick={() => handleTabClick("NA")}
            >
              <h2 className="text-[20px]">
                <span className="text-[26px] font-bold">(14)</span> NA Schemes
              </h2>
              <img src={NA} className="NA" alt="" />
            </div>
            <div
              className={`tab mt-5 shadow-customShadow rounded p-5 cursor-pointer font-semibold ${
                toggleTab === "" && "bg-customBlue text-white"
              }`}
              onClick={() => handleTabClick("")}
            >
              <h2 className="text-[20px]">
                <span className="text-[26px] font-bold">(10)</span> Possible
                Reasons
              </h2>
              <img src={bulb} className="bulb" alt="" />
            </div>
          </div>
          <div className="insites-right">
            <div className=" shadow-customShadow rounded p-3 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 target-card-section">
              {infoCards.map((info, index) => {
                const logoUrl = `images/schemes/${info.Project_Code}.png`;
                return (
                  <div key={index} className="">
                    <div className="target-card">
                      <div className="target-card-header">
                        <div className="flex items-center">
                          <img src={logoUrl} className="logo" alt="" />
                          <h2 className=" ml-2 font-bold">{info.scheme}</h2>
                        </div>
                        <span className="per-achieved text-white">
                          {info.percent} Achieved
                        </span>
                      </div>
                      <div className="target-content grid grid-cols-2 gap-4">
                        <div className="w-full ">
                          <h2 className="font-semibold text-sm mb-1">
                            (Present Value)
                          </h2>
                          <div className="p-2 shadow-customShadow rounded present w-full">
                            <p className="text-gray-600">{info.kpi}</p>
                            <h3 className="text-lg font-semibold">
                              {info.presentValue}
                            </h3>
                          </div>
                        </div>
                        <div className="w-full">
                          <h2 className="font-semibold text-sm mb-1">
                            (Target Value)
                          </h2>
                          <div className="p-2 shadow-customShadow rounded target bg-green-50 ">
                            <p className="text-gray-600">{info.kpi}</p>
                            <h3 className="text-lg font-semibold">
                              {info.targetValue}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TargetSection;
