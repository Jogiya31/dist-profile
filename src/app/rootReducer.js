import { combineReducers } from "@reduxjs/toolkit";
import allSchemeReducer from "../redux/allScheme/allSchemeSlice";
import filtersReducer from "../redux/filters/filtersSlice";
import aboutReducer from "../redux/about/aboutSlice";
import NAschemesReducer from "../redux/NAschemes/NAschemesSlice";
/**
 * here we combine all pages reducer for gets update redux state
 **/
// Combine multiple reducers into a single rootReducer
const rootReducer = combineReducers({
  // Reducer for managing allScheme state
  allScheme: allSchemeReducer,
  // Reducer for managing filters state
  filters: filtersReducer,
  // Reducer for managing about info state
  about: aboutReducer,  
  // Reducer for managing NAschemes info state
  NAschemes: NAschemesReducer,

});

// Export the combined rootReducer
export default rootReducer;
