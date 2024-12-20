import { combineReducers } from "@reduxjs/toolkit";
import allSchemeReducer from "../redux/allScheme/allSchemeSlice";
import filtersReducer from "../redux/filters/filtersSlice";
/**
 * here we combine all pages reducer for gets update redux state
 **/
// Combine multiple reducers into a single rootReducer
const rootReducer = combineReducers({
  // Reducer for managing allScheme state
  allScheme: allSchemeReducer,
  // Reducer for managing filters state
  filters: filtersReducer,
});

// Export the combined rootReducer
export default rootReducer;
