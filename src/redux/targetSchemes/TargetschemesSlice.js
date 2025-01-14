import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: false,
  data: [],
  success: false,
  message: "",
};

const Targetschemes = createSlice({
  name: "Targetschemes",
  initialState,
  reducers: {
    // Action to initiate fetching all scheme info
    getTargetschemesInfo(state, action) {
      state.loader = true;
      state.message = ""; // Clear previous error message
      state.data = []; // Clear previous data
    },
    // Action dispatched when all scheme info is successfully fetched
    getTargetschemesInfoSuccess(state, action) {
      state.loader = false;
      state.success = true;
      state.data = action.payload; // Set fetched data
    },
    // Action dispatched when fetching all scheme info fails
    getTargetschemesInfoFailed(state, action) {
      state.loader = false;
      state.message = action.payload; // Set error message
      state.success = false;
    },

    // Action to clear Targetschemes state data
    clearData(state) {
      state.data = [];
      state.loader = false;
      state.success = false;
      state.message = ""; // Clear any existing error message
    },
  },
});

// Actions
export const TargetschemesActions = Targetschemes.actions;

// Export reducer
const TargetschemesReducer = Targetschemes.reducer;
export default TargetschemesReducer;
