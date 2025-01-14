/* eslint-disable react-hooks/exhaustive-deps */
import sectionBg from "../assets/images/sectionbg.png";
import dots from "../assets/images/dots.png";
import LineChart from "./Linechart";
import { useDispatch, useSelector } from "react-redux";
import { MultiSelect } from "react-multi-select-component";
import { useEffect, useState } from "react";
import { forecastschemesActions } from "../redux/forecast/forecastschemesSlice";

const ForecastSection = ({ StateCode, DistrictCode }) => {
  const dispatch = useDispatch(); // Redux dispatch hook

  const [schemeOptions, setschemeOptions] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [schemeValue, setSchemeValue] = useState(""); // Selected state value state
  const [schemeFilter, setSchemeFilter] = useState([]); // State filter state
  const [dataValue, setDataValue] = useState([]);
  const [labelsValue, setLabelsValue] = useState([]);

  const allSchemesDistrictData = useSelector(
    (state) => state.allScheme.districtdata || []
  ); //allscheme list from Redux store

  const forecastData = useSelector((state) => state.forecastschemes.data || []);
  const loader = useSelector((state) => state.forecastschemes.loader || []);

  useEffect(() => {
    // Extract the first data entry (assuming there is only one).
    const dataEntry = forecastData && forecastData.Data && forecastData.Data[0];

    // Process Date_Value into an array.
    const dateValues =
      dataEntry && dataEntry.Date_Value.replace(/"/g, "").split(",");

    // Process Final_Value into an array of numbers.
    const finalValues =
      dataEntry && dataEntry.Final_Value.split(",").map(Number);

    if (dateValues || finalValues) {
      setLabelsValue(dateValues);
      setDataValue(finalValues);
    }
  }, [forecastData]);

  useEffect(() => {
    let options = [];
    // Update state dropdown list
    if (
      allSchemesDistrictData &&
      allSchemesDistrictData.Table &&
      allSchemesDistrictData.Table.length > 0
    ) {
      options = [];
      allSchemesDistrictData &&
        allSchemesDistrictData.Table &&
        allSchemesDistrictData.Table.forEach((item) => {
          if (item.project_name) {
            options.push({
              label: item.project_name,
              value: item.project_code,
            });
          }
        });
      setschemeOptions([...options]);
    }
  }, [allSchemesDistrictData]);

  // Function to handle state filter selection
  const handleSchemeFilter = (newSelected) => {
    if (newSelected.length) {
      const newAr = [newSelected[newSelected.length - 1]];
      setSchemeValue(newAr[0].label);
      setSchemeFilter(newAr);
      dispatch(
        forecastschemesActions.getforecastschemesInfo({
          SectorCode: "",
          DeptCode: "",
          StateCode: StateCode,
          DistrictCode: DistrictCode,
          SchemeName: newAr[0].label,
          KpiName: "",
        })
      );
    } else {
      setSchemeFilter([]);
      setSchemeValue("");
      dispatch(forecastschemesActions.clearData());
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

  return (
    <div className="container-flex bg-primary-bg pb-12">
      <img src={sectionBg} alt="" />
      <div className="custom-container insites grid grid-cols-1 sm:grid-cols-[50%_50%] md:grid-cols-[60%_40%] lg:grid-cols-[60%_40%] gap-4">
        <div className="shadow-customShadow rounded-xl ">
          <div className="forcast-map">
            <h1 className="forcast-title">Forecast Section</h1>
            <div className="forcast-filter">
              <MultiSelect
                className=" w-[260px] text-left custom-select cursor-pointer mr-2"
                options={schemeOptions}
                value={schemeFilter}
                onChange={handleSchemeFilter}
                ItemRenderer={customItemRenderer}
                closeOnChangedValue={true}
                overrideStrings={{
                  selectSomeItems: "Select scheme...",
                }}
                hasSelectAll={false}
              />
              <img src={dots} className="dots" alt="" />
            </div>
          </div>
          <div className="p-4">
            <LineChart data={dataValue} labels={labelsValue} loader={loader} />
          </div>
        </div>
        <div>
          <div className="shadow-customShadow forcast rounded-xl p-5">
            <h1 className="scheme-title">SCHEME INSIGHTS</h1>
            <div className="flex justify-around mt-3 p-3 scheme-counts">
              <h2>
                State Rank <span className="state-count">01</span>
              </h2>
              <h2>
                District Rank <span className="dist-count">36</span>
              </h2>
              <h2>
                Scheme Rank{" "}
                <span className="p-2 rounded bg-[#e3effd] scheme-count">
                  15
                </span>
              </h2>
            </div>
          </div>
          <div className="shadow-customShadow rounded-xl p-6 mt-5">
            <h2 className="font-semibold">Points of improvement:</h2>
            <ol className="improvement-lists">
              <li>
                Accelerate tap water connections in partially covered villages.
              </li>
              <li>
                Strengthen Village Water and Sanitation Committees for better
                monitoring.
              </li>
              <li>Improve water quality testing frequency and standards.</li>
              <li>Address delays in infrastructure maintenance and repairs.</li>
              <li>
                Enhance training for local staff managing operations and
                maintenance.
              </li>
              <li>
                Ensure equitable access, especially in remote or underserved
                areas.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForecastSection;
