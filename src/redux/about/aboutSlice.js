import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: false,
  data: [],
  success: false,
  message: "",
};

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    // Action to initiate fetching all scheme info
    getaboutInfo(state, action) {
      state.loader = true;
      state.message = ""; // Clear previous error message
      state.data = []; // Clear previous data
    },
    // Action dispatched when all scheme info is successfully fetched
    getaboutInfoSuccess(state, action) {
      state.loader = false;
      state.success = true;
      state.data = action.payload; // Set fetched data
    },
    // Action dispatched when fetching all scheme info fails
    getaboutInfoFailed(state, action) {
      state.loader = false;
      state.message = action.payload; // Set error message
      state.success = false;
    },

    // Action to clear about state data
    clearData(state) {
      state.data = [];
      state.loader = false;
      state.success = false;
      state.message = ""; // Clear any existing error message
    },
  },
});

// Actions
export const aboutActions = aboutSlice.actions;

// Export reducer
const aboutReducer = aboutSlice.reducer;
export default aboutReducer;
