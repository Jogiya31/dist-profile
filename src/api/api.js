import axiosClient from "./axiosClient";


// ------------------api call for allscheme list page with filters---------------
export const allSchemeInfo = (data) => {
  const payload = data.payload;
  const url = `/prayasplus/ReportsApi/GetDataForPMDashboardHome`;
  return axiosClient().post(url, payload, {
    "Content-Type": "application/json",
  });
};

/**
 *
 * Start filter api urls
 *
 **/


// api call for get all state list
export const StateList = (data) => {
  const payload = data.payload;
  const url = `/prayasplus/ReportsApi/GetAllStates`;
  return axiosClient().post(url, payload, {
    "Content-Type": "application/json",
  });
};

// api call for get all district list using state code
export const districtList = (data) => {
  const payload = data.payload;
  const url = `/prayasplus/ReportsApi/GetDistrictByStateCode`;
  return axiosClient().post(url, payload, {
    "Content-Type": "application/json",
  });
};

// api call for get all sector list
export const sectorList = () => {
  // const url = `/prayasplus/ReportsApi/GetAllSectors`;
  const url = `/Prayas2.0_API/api/DemoController/GetAllSector`;
  return axiosClient().post(url);
};


/**
 *
 * End filter api urls
 *
 **/