import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: false,
  data: [],
  success: false,
  message: "",
};

const NAschemes = createSlice({
  name: "NAschemes",
  initialState,
  reducers: {
    // Action to initiate fetching all scheme info
    getNAschemesInfo(state, action) {
      state.loader = true;
      state.message = ""; // Clear previous error message
      state.data = []; // Clear previous data
    },
    // Action dispatched when all scheme info is successfully fetched
    getNAschemesInfoSuccess(state, action) {
      state.loader = false;
      state.success = true;
      state.data = action.payload; // Set fetched data
    },
    // Action dispatched when fetching all scheme info fails
    getNAschemesInfoFailed(state, action) {
      state.loader = false;
      state.message = action.payload; // Set error message
      state.success = false;
    },

    // Action to clear NAschemes state data
    clearData(state) {
      state.data = [];
      state.loader = false;
      state.success = false;
      state.message = ""; // Clear any existing error message
    },
  },
});

// Actions
export const NAschemesActions = NAschemes.actions;

// Export reducer
const NAschemesReducer = NAschemes.reducer;
export default NAschemesReducer;
