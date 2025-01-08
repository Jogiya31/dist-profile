import { all } from "redux-saga/effects";
import allSchemeSaga from "../redux/allScheme/allSchemeSaga";
import filtersSaga from "../redux/filters/filtersSaga";
import aboutSaga from "../redux/about/aboutSaga";
import NAschemesSaga from "../redux/NAschemes/NAschemeSaga";

/**
 * used to allow a Redux store to interact with resources itself asynchronously
 **/
// Define the rootSaga generator function
export default function* rootSaga() {
  // Use the 'all' effect to run multiple sagas concurrently
  yield all([
    // Call and run the allSchemeSaga
    allSchemeSaga(),
    // Call and run the filtersSaga
    filtersSaga(),    
    // Call and run the aboutSaga
    aboutSaga(),   
    // Call and run the NAschemesSaga
    NAschemesSaga(),
  ]);
}
