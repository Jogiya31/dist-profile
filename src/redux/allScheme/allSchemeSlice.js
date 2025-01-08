import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: false,
  data: [],
  districtdata: [],
  success: false,
  message: "",
};

const allSchemeSlice = createSlice({
  name: "allScheme",
  initialState,
  reducers: {
    // Action to initiate fetching all scheme info
    getAllSchemeInfo(state, action) {
      state.loader = true;
      state.message = ""; // Clear previous error message
      state.data = []; // Clear previous data
    },
    // Action dispatched when all scheme info is successfully fetched
    getAllSchemeInfoSuccess(state, action) {
      state.loader = false;
      state.success = true;
      state.data = action.payload; // Set fetched data
    },
    // Action dispatched when fetching all scheme info fails
    getAllSchemeInfoFailed(state, action) {
      state.loader = false;
      state.message = action.payload; // Set error message
      state.success = false;
    },
    // Action to initiate fetching all scheme info
    getAllSchemeInfoWithDistrict(state, action) {
      state.loader = true;
      state.message = ""; // Clear previous error message
      state.districtdata = []; // Clear previous data
    },
    // Action dispatched when all scheme info is successfully fetched
    getAllSchemeInfoWithDistrictSuccess(state, action) {
      state.loader = false;
      state.success = true;
      state.districtdata = action.payload; // Set fetched data
    },
    // Action dispatched when fetching all scheme info fails
    getAllSchemeInfoWithDistrictFailed(state, action) {
      state.loader = false;
      state.message = action.payload; // Set error message
      state.success = false;
    },
    // Action to clear allScheme state data
    clearData(state) {
      state.data = [];
      state.districtdata = [];
      state.loader = false;
      state.success = false;
      state.message = ""; // Clear any existing error message
    },
  },
});

// Actions
export const allSchemeActions = allSchemeSlice.actions;

// Export reducer
const allSchemeReducer = allSchemeSlice.reducer;
export default allSchemeReducer;
