import { call, put, takeLatest } from "redux-saga/effects";
import { allSchemeActions } from "./allSchemeSlice";
import { allSchemeInfo } from "../../api/api";
import { toast } from "react-toastify";

// Saga function to handle fetching all scheme info
function* handleAllSchemeInfo(data) {
  try {
    // Call API to fetch all scheme info
    const response = yield call(allSchemeInfo, data);
    if (response.status === 200) {
      // If request is successful, dispatch success action with data payload
      const data = response.data;
      yield put(allSchemeActions.getAllSchemeInfoSuccess(data));
    } else {
      // If request fails, throw error
      throw new Error("Something went wrong");
    }
  } catch (error) {
    // If error occurs, dispatch failure action and display error message
    toast.error(error.message);
    yield put(allSchemeActions.getAllSchemeInfoFailed(error.message));
  }
}

// Saga function to handle fetching all scheme info
function* handleAllSchemeInfoWithDistrict(data) {
  try {
    // Call API to fetch all scheme info
    const response = yield call(allSchemeInfo, data);
    if (response.status === 200) {
      // If request is successful, dispatch success action with data payload
      const data = response.data;
      yield put(allSchemeActions.getAllSchemeInfoWithDistrictSuccess(data));
    } else {
      // If request fails, throw error
      throw new Error("Something went wrong");
    }
  } catch (error) {
    // If error occurs, dispatch failure action and display error message
    toast.error(error.message);
    yield put(
      allSchemeActions.getAllSchemeInfoWithDistrictFailed(error.message)
    );
  }
}

// Watcher saga to listen for getAllSchemeInfo action and call handleAllSchemeInfo saga
export default function* allSchemeSaga() {
  yield takeLatest(
    allSchemeActions.getAllSchemeInfo.type,
    handleAllSchemeInfo
  );
  yield takeLatest(
    allSchemeActions.getAllSchemeInfoWithDistrict.type,
    handleAllSchemeInfoWithDistrict
  );
}
