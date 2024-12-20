import sectionBg from "../assets/images/sectionbg.png";
import dots from "../assets/images/dots.png";
import LineChart from "./Linechart";

const ForecastSection = () => {
  return (
    <div className="container-flex bg-primary-bg pb-12">
      <img src={sectionBg} alt="" />
      <div className="custom-container insites grid grid-cols-1 sm:grid-cols-[50%_50%] md:grid-cols-[60%_40%] lg:grid-cols-[60%_40%] gap-4">
        <div className="shadow-customShadow rounded-xl ">
          <div className="forcast-map">
            <h1 className="forcast-title">Forecast Section</h1>
            <div className="forcast-filter">
              <select className="custome-select">
                <option>Jal Jeevan Mission</option>
                <option>Jal Jeevan Mission</option>
              </select>
              <select className="custome-select">
                <option>5Yr</option>
                <option>5yr</option>
              </select>
              <img src={dots} className="dots" alt="" />
            </div>
          </div>
          <div className="p-4">
            <LineChart />
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
