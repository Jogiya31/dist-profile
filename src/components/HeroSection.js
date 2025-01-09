const HeroSection = ({ stateName, districtName, stateImg, insites }) => {
  return (
    <div className="w-full p-6 bg-primary-bg banner">
      <div className="grid grid-cols-[20%,60%,20%] gap-2 items-center">
        <div className="rounded-[5px] shadow-customShadow ml-[9rem] head-state">
          <div className="state-dist-name">
            <h1 className="distName text-neutral-800 font-bold">{districtName}</h1>
            <p className="text-gray-600 mt-2">{stateName}</p>
          </div>
          <div className="AspDistrict bg-customBlue text-white text-center flex justify-center items-center h-[30px]">
            Aspirational Districts
          </div>
        </div>
        <div className="p-4 font-inter text-base font-normal leading-5 text-justify from-font text-decoration-skip-none">
          <p>{insites}</p>
        </div>
        <div className="p-4 pr-3">
          <img src={stateImg} className="w-40 StateImage"  alt="StateImage"  />
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
