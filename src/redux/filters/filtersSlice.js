import { createSlice } from "@reduxjs/toolkit";

// Define initial state for filters
const initialState = {
  loader: false,
  states: [],
  districts: [],
  success: false,
  statesMessage: "",
  districtsMessage: "",
};

// Create filters slice with reducers
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    // Actions to get states list
    getStatesList(state) {
      state.loader = true;
      state.statesMessage = "";
    },
    getStatesListSuccess(state, action) {
      state.loader = false;
      state.success = true;
      state.states = action.payload;
    },
    getStatesListFailed(state, action) {
      state.loader = false;
      state.statesMessage = action.payload;
      state.success = false;
    },

    
    // Actions to get districts list
    getDistrictsList(state) {
      state.loader = true;
      state.districtsMessage = "";
    },
    getDistrictsListSuccess(state, action) {
      state.loader = false;
      state.success = true;
      state.districts = action.payload;
    },
    getDistrictsListFailed(state, action) {
      state.loader = false;
      state.districtsMessage = action.payload;
      state.success = false;
    },

    // Actions to get sectors list
    getSectorsList(state) {
      state.loader = true;
      state.sectorsMessage = "";
    },
    getSectorsListSuccess(state, action) {
      state.loader = false;
      state.success = true;
      state.sectors = action.payload;
    },
    getSectorsListFailed(state, action) {
      state.loader = false;
      state.sectorsMessage = action.payload;
      state.success = false;
    },


    // Action to clear filter data
    clearData(state) {
      state.loader = false;
      state.success = false;
      state.states = [];
      state.districts = [];
      state.statesMessage = "";
      state.districtsMessage = "";
    },
   
  },
});

// Export actions and reducer
export const filtersActions = filtersSlice.actions;
export default filtersSlice.reducer;
