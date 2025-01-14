import axios from "axios";
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
  const url = `/prayasplus/ReportsApi/GetAllSectors`;
  return axiosClient().post(url);
};


// api call for get about info
export const aboutInfo = (data) => {
  const payload = data.payload;
  const url = `http://127.0.0.1:8000/district_profilling`;
  return axios.post(url, payload, {
    "Content-Type": "application/json",
  });
};


// api call for get NAschemes info
export const NAschemesInfo = (data) => {
  const payload = data.payload;
  const url = `http://127.0.0.1:8000/unimplemented_schemes`;
  return axios.post(url, payload, {
    "Content-Type": "application/json",
  });
};

// api call for get NAschemes info
export const TargetschemesInfo = (data) => {
  const payload = data.payload;
  const url = `http://127.0.0.1:8000/fetch_kpi_data`;
  return axios.post(url, payload, {
    "Content-Type": "application/json",
  });
};

// api call for get NAschemes info
export const forecastschemesInfo = (data) => {
  const payload = data.payload;
  const url = `/Prayas2.0_API/api/DemoController/GetCriticalKpisReport`;
  return axiosClient().post(url, payload, {
    "Content-Type": "application/json",
  });
};



/**
 *
 * End filter api urls
 *
 **/