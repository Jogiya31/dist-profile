import sectionBg from "../assets/images/sectionbg.png";
import target from "../assets/images/target.png";
import upArrow from "../assets/images/w-upArrow.png";
import NA from "../assets/images/NA.png";
import bulb from "../assets/images/bulb.png";
import "../assets/css/TargetSection.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NAschemesActions } from "../redux/targetSchemes/NAschemesSlice";
import CustomModal from "./CustomModal";

const TargetSection = ({ stateValue, districtValue }) => {
  const dispatch = useDispatch(); // Redux dispatch hook
  const [toggleTab, setToggleTab] = useState("NA");
  const [districtCount, setdistrictCount] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  // get data from redux store
  const allSchemesData = useSelector((state) => state.allScheme.data || []); //allscheme list from Redux store
  const schemeReasion = useSelector((state) => state.NAschemes.data);
  const allSchemesDistrictData = useSelector(
    (state) => state.allScheme.districtdata || []
  ); //allscheme list from Redux store

  const targetSchemeData = useSelector(
    (state) => state.Targetschemes.data || []
  );

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleTabClick = (val) => {
    setToggleTab(val);
  };

  useEffect(() => {
    const allschemesArray = allSchemesData.Table;
    const allSchemesDistrictDataArray = allSchemesDistrictData.Table;

    // get district level schemes data from all schemes
    const totalDistrictSchemes =
      allschemesArray &&
      allschemesArray.filter((item) => item.Granularity === "District");

    // get district level schemes for selected filter
    const schemesForDistrict =
      allSchemesDistrictDataArray &&
      allSchemesDistrictDataArray.filter(
        (item) => item.Granularity === "District"
      );

    // Find NA district schemes in filtered state/district
    const difference =
      totalDistrictSchemes &&
      totalDistrictSchemes.filter((obj1) => {
        const isMatch = schemesForDistrict.some(
          (obj2) => obj1.project_code === obj2.project_code
        );
        return !isMatch;
      });
    setdistrictCount(difference);
  }, [allSchemesData, allSchemesDistrictData]);

  const handleSchemeClick = (stateValue, districtValue, schemeName) => {
    dispatch(
      NAschemesActions.getNAschemesInfo({
        schemeName: schemeName,
        districtName: districtValue,
        stateName: stateValue,
      })
    );
    toggleModal();
  };

  return (
    <>
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
                <h2 className="text-xl text-white font-bold ">
                  Schemes ({targetSchemeData && targetSchemeData.length})
                </h2>
                <img src={upArrow} className="header-logo" alt="" />
              </div>
            </div>
            <div className=" shadow-customShadow rounded mt-4 p-3 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 target-card-section">
              {targetSchemeData &&
                targetSchemeData.map((info, index) => {
                  const logoUrl = `images/schemes/${info.project_code}.png`;
                  return (
                    <div key={index} className="">
                      <div className="target-card">
                        <div className="target-card-header">
                          <div className="flex target-title items-center">
                            <img src={logoUrl} className="logo" alt="" />
                            <h2 className=" ml-2 font-bold">
                              {info.scheme_name}
                            </h2>
                          </div>
                          <span className="per-achieved text-white">
                            {info.Achieved_Percentage.toFixed(2)}% Achieved
                          </span>
                        </div>
                        <div className="target-content grid grid-cols-2 gap-4">
                          <div className="w-full ">
                            <h2 className="font-semibold text-sm mb-1">
                              (Present Value)
                            </h2>
                            <div className="p-2 shadow-customShadow rounded present w-full">
                              <p className="text-gray-600">{info.KPI}</p>
                              <h3 className="text-lg font-semibold">
                                {info.Present_Value}
                              </h3>
                            </div>
                          </div>
                          <div className="w-full">
                            <h2 className="font-semibold text-sm mb-1">
                              (Target Value)
                            </h2>
                            <div className="p-2 shadow-customShadow rounded target bg-green-50 ">
                              <p className="text-gray-600">{info.Target_KPI}</p>
                              <h3 className="text-lg font-semibold">
                                {info.Target_Value}
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
                  <span className="text-[26px] font-bold">
                    ({districtCount && districtCount.length})
                  </span>{" "}
                  NA Schemes
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
                  <span className="text-[26px] font-bold">
                    {" "}
                    ({districtCount && districtCount.length})
                  </span>{" "}
                  Possible Reasons
                </h2>
                <img src={bulb} className="bulb" alt="" />
              </div>
            </div>
            <div className="insites-right">
              <div className=" shadow-customShadow rounded p-3 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 target-card-section">
                {districtCount &&
                  districtCount.map((item, index) => {
                    const logoUrl = `images/schemes/${item.project_code}.png`;
                    return (
                      <div
                        key={index}
                        className=""
                        onClick={() =>
                          handleSchemeClick(
                            stateValue,
                            districtValue,
                            item.project_name
                          )
                        }
                      >
                        <div className="target-card">
                          <div className="target-card-header">
                            <div className="flex items-center">
                              <img src={logoUrl} className="logo" alt="" />
                              <h2 className=" ml-2 font-bold">
                                {item.project_name}
                              </h2>
                            </div>
                            <div>
                              <span className="text-gray-300 font-bold text-lg">
                                NA
                              </span>
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

      <CustomModal toggleModal={toggleModal} isModalOpen={isModalOpen}>
        <p className="mb-5 font-normal text-gray-700">
          {schemeReasion && schemeReasion.reason}
        </p>
      </CustomModal>
    </>
  );
};
export default TargetSection;
