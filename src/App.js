import HeroSection from "./components/HeroSection";
import SchemesSection from "./components/SchemesSection";
import TargetSection from "./components/TargetSection";
import ForecastSection from "./components/ForecastSection";
import sectionBg from "./assets/images/sectionbg.png";
import headerleft from "./assets/images/header-left.png";
import headerright from "./assets/images/header-right.png";
import headercenter from "./assets/images/header-center.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filtersActions } from "./redux/filters/filtersSlice";
import { allSchemeActions } from "./redux/allScheme/allSchemeSlice";
import { MultiSelect } from "react-multi-select-component";
import { aboutActions } from "./redux/about/aboutSlice";
import { TargetschemesActions } from "./redux/targetSchemes/TargetschemesSlice";
import banner from "./assets/images/banner.png";

function App() {
  const dispatch = useDispatch(); // Redux dispatch hook

  const [stateFilter, setStateFilter] = useState([]); // State filter state
  const [districtFilter, setdistrictFilter] = useState([]); // District filter state
  const [statesOption, setStatesOptions] = useState([]); // State options state
  const [districtOption, setdistrictOptions] = useState([]); // District options state
  const [stateValue, setStateValue] = useState(""); // Selected state value state
  const [districtValue, setDistrictValue] = useState(""); // Selected district value state
  const [currentFilter, setCurrentFilter] = useState(null); // Current filter state
  const [filterPayload, setFilterPayload] = useState({
    StateCode: "",
    DistrictCode: "",
  });
  const [showData, setshowData] = useState(false);

  const statesList = useSelector((state) => state.filters.states || []); // States list from Redux store
  const districtsList = useSelector((state) => state.filters.districts || []); // Districts list from Redux store
  const aboutDistrict = useSelector((state) => state.about.data || []); // Districts list from Redux store

  // calling default api here
  useEffect(() => {
    // Dispatch actions to clear existing data and fetch new data
    dispatch(filtersActions.clearData()); // Clear existing filter data
    dispatch(filtersActions.getStatesList({ filters: 0 })); // Fetch state list
    dispatch(filtersActions.getDistrictsList({ state_code: 0 })); // Fetch district list
    dispatch(filtersActions.getSectorsList()); // Fetch sector list

    // No need to return anything from this effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // create filter payload
  useEffect(() => {
    // Update the filter payload based on the current filter selection
    let updatedPayload = { ...filterPayload };

    // Handle state filter
    if (currentFilter === "state") {
      setdistrictFilter(null);
      if (stateFilter && stateFilter.length > 0) {
        setdistrictFilter([]);
        setCurrentFilter(null);
        let statePayload = "";
        for (let index = 0; index < stateFilter.length; index++) {
          const element = stateFilter[index];
          statePayload += `${element.value},`;
          dispatch(
            filtersActions.getDistrictsList({
              state_code: statePayload.slice(0, -1),
            })
          );
        }
        updatedPayload = {
          ...updatedPayload,
          StateCode: statePayload.slice(0, -1),
          DistrictCode: "",
        };
      } else {
        setdistrictFilter([]);
        setCurrentFilter(null);
        dispatch(
          filtersActions.getDistrictsList({
            state_code: "",
          })
        );
        updatedPayload = { ...updatedPayload, StateCode: "", DistrictCode: "" };
      }
    }

    // Handle district filter
    if (currentFilter === "district") {
      if (districtFilter && districtFilter.length > 0) {
        let districtPayload = "";
        let statePayload = "";
        for (let index = 0; index < districtFilter.length; index++) {
          const element = districtFilter[index];
          districtPayload += `${element.value},`;
        }
        for (let index = 0; index < stateFilter.length; index++) {
          const element = stateFilter[index];
          statePayload += `${element.value},`;
        }
        updatedPayload = {
          ...updatedPayload,
          StateCode: statePayload.slice(0, -1),
          DistrictCode: districtPayload.slice(0, -1),
        };
      } else {
        updatedPayload = { ...updatedPayload, DistrictCode: "" };
      }
    }

    // Update the filter payload
    setFilterPayload(updatedPayload);

    // No need to return anything from this effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateFilter, districtFilter]);

  // create select options objects from response list
  useEffect(() => {
    let options = [];

    // Update state dropdown list
    if (statesList && statesList.Table && statesList.Table.length > 0) {
      options = [];
      statesList &&
        statesList.Table &&
        statesList.Table.forEach((item) => {
          if (item.State_Name) {
            options.push({ label: item.State_Name, value: item.state_code });
          }
        });
      setStatesOptions([...options]);
    }

    // Update district dropdown list
    if (
      districtsList &&
      districtsList.Table &&
      districtsList.Table.length > 0
    ) {
      options = [];
      districtsList &&
        districtsList.Table &&
        districtsList.Table.forEach((item) => {
          if (item.district_name) {
            options.push({ label: item.district_name, value: item.dist_code });
          }
        });
      setdistrictOptions([...options]);
    }

    // No need to return anything from this effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statesList, districtsList]);

  // Function to handle state filter selection
  const handleStateFilter = (newSelected) => {
    setCurrentFilter("state");
    if (newSelected.length) {
      const newAr = [newSelected[newSelected.length - 1]];
      // setStateValue(newAr[0].label);
      setStateFilter(newAr);
    } else {
      setStateFilter([]);
      setStateValue("");
    }
    setDistrictValue("");
  };
  // Function to handle district filter selection
  const handleDistrictFilter = (newSelected) => {
    setCurrentFilter("district");
    if (newSelected.length) {
      const newAr = [newSelected[newSelected.length - 1]];
      // setDistrictValue(newAr[0].label);
      setdistrictFilter(newAr);

      const getDistObject =
        districtsList &&
        districtsList.Table &&
        districtsList.Table.filter(
          (dist) =>
            Number(dist.dist_code) ===
            Number(newAr && newAr[0] && newAr[0].value)
        );

      const getStatObject =
        statesList &&
        statesList.Table &&
        statesList.Table.filter(
          (st) =>
            Number(st.state_code) ===
            Number(
              getDistObject && getDistObject[0] && getDistObject[0].state_code
            )
        );
      setStateFilter([
        {
          label:
            getStatObject && getStatObject[0] && getStatObject[0].State_Name,
          value:
            getStatObject && getStatObject[0] && getStatObject[0].state_code,
        },
      ]);
      // setStateValue(
      //   getStatObject && getStatObject[0] && getStatObject[0].State_Name
      // );
    } else {
      setdistrictFilter([]);
      setDistrictValue("");
    }
  };
  // Custom item renderer function for rendering dropdown options
  const customItemRenderer = ({ option, isSelected, onClick }) => (
    <div>
      {/* Hidden input to manage selection */}
      <input
        className="hidden"
        type="radio"
        checked={isSelected}
        onChange={() => onClick(option)}
      />
      {/* Displaying the option label */}
      {option.label}
    </div>
  );

  const handleApply = () => {
    if (stateFilter.length > 0 && districtFilter.length > 0) {
      setDistrictValue(districtFilter[0].label);
      setStateValue(stateFilter[0].label);
      dispatch(
        allSchemeActions.getAllSchemeInfo({
          MinistryCode: "0",
          sectorcode: 0,
          StateCode: 0,
          DistrictCode: 0,
          FilterCode: 0,
        })
      ); // Fetch all scheme information

      dispatch(
        allSchemeActions.getAllSchemeInfoWithDistrict({
          MinistryCode: "0",
          sectorcode: 0,
          StateCode: filterPayload.StateCode,
          DistrictCode: filterPayload.DistrictCode,
          FilterCode: 0,
        })
      ); // Fetch all scheme information

      dispatch(
        aboutActions.getaboutInfo({
          stateCode: filterPayload.StateCode,
          districtCode: filterPayload.DistrictCode,
        })
      ); // Fetch district information

      dispatch(
        TargetschemesActions.getTargetschemesInfo({
          stateCode: filterPayload.StateCode,
          districtCode: filterPayload.DistrictCode,
        })
      ); // Fetch target Schemes information

      setshowData(true);
    }
  };

  return (
    <div className="wrapper">
      <header className="">
        <div className="flex justify-between w-full">
          <img className="header-img" src={headerright} alt="" />
          <img className="header-img" src={headercenter} alt="" />
          <img className="header-img" src={headerleft} alt="" />
        </div>
        <div className="grid grid-cols-2 filter-header bg-white gap-4 border-t border-t-[#e4e4e4]">
          <div className="bg-white p-4 text-right filters ">
            <div className="flex justify-center space-x-4">
              <MultiSelect
                className=" w-[260px] text-left custom-select cursor-pointer"
                options={statesOption}
                value={stateFilter}
                onChange={handleStateFilter}
                ItemRenderer={customItemRenderer}
                closeOnChangedValue={true}
                overrideStrings={{
                  selectSomeItems: "StateUT",
                }}
                hasSelectAll={false}
              />
              <MultiSelect
                className=" w-[260px] text-left custom-select cursor-pointer"
                options={districtOption}
                value={districtFilter}
                onChange={handleDistrictFilter}
                ItemRenderer={customItemRenderer}
                closeOnChangedValue={true}
                overrideStrings={{
                  selectSomeItems: "Districts",
                }}
                hasSelectAll={false}
              />
              <button
                className={`bg-customBlue apply w-[95px] text-white rounded-[4px]  ${
                  districtFilter.length < 1
                    ? "opacity-35"
                    : "opacity-100 cursor-pointer"
                }`}
                onClick={() => handleApply()}
                disabled={districtFilter.length < 1}
              >
                Apply
              </button>
            </div>
          </div>
          <div className="bg-white"></div>
        </div>
      </header>
      {stateValue && districtValue && showData ? (
        <main>
          <HeroSection
            stateName={stateValue}
            districtName={districtValue}
            stateImg={
              stateValue !== "" &&
              `images/blueState/${
                stateFilter && stateFilter[0] && stateFilter[0].value
              }.svg`
            }
            insites={aboutDistrict[0] && aboutDistrict[0].aboutDistrict}
          />
          <SchemesSection />
          <TargetSection
            stateValue={stateValue}
            districtValue={districtValue}
          />
          <ForecastSection
            StateCode={filterPayload.StateCode || ""}
            DistrictCode={filterPayload.DistrictCode || ""}
          />
        </main>
      ) : (
        <main className="bg-primary-bg">
          <img src={sectionBg} alt="" />
          <div className="custom-container flex justify-center">
            <div className="w-[70%] justify-center items-center">
              {/* <span className="flex justify-center message">
                Please select State/UT and/or District
              </span> */}
              <h1 className="flex justify-center text-xl text-[#1269A9] font-bold underline  ">
                District Profiling: An In-Depth Analysis
              </h1>
              <p className="text-justify mt-4">
                District profiling is a comprehensive approach to collecting,
                analyzing, and presenting data about a specific administrative
                area. It provides insights into the district’s demographics,
                socio-economic conditions, infrastructure, geography, and more.
                This document delves into the various aspects of district
                profiling, offering a detailed overview of its components,
                benefits, and potential applications.
              </p>
              <div className="flex justify-between mt-4">
                <ol>
                  <li>1. Geography and Location </li>
                  <li>2. Demographics</li>
                  <li>3. Economy</li>
                  <li>4. Education</li>
                </ol>
                <ol>
                  <li>5. Health </li>
                  <li>6. Infrastructure</li>
                  <li>7. Governance</li>
                </ol>
                <ol>
                  <li>8. Culture and Heritage</li>
                  <li> 9. Environment and Natural Resources</li>
                  <li>10. Key Challenges and Opportunities</li>
                </ol>
              </div>

              <img src={banner} className="mt-10" alt="banners"></img>
            </div>
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
}

export default App;
