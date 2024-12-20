import { call, put, takeLatest } from "redux-saga/effects";
import { StateList, districtList, sectorList } from "../../api/api";
import { filtersActions } from "./filtersSlice";

// Saga function to fetch state list data
function* getStateListData(data) {
  try {
    const response = yield call(StateList, data);
    if (response.status === 200) {
      const data = response.data;
      yield put(filtersActions.getStatesListSuccess(data));
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    // Dispatch action to handle failure
    yield put(filtersActions.getStatesListFailed(error.message));
  }
}

// Saga function to fetch district list data
function* getDistrictListData(data) {
  try {
    const response = yield call(districtList, data);
    if (response.status === 200) {
      const data = response.data;
      yield put(filtersActions.getDistrictsListSuccess(data));
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    // Dispatch action to handle failure
    yield put(filtersActions.getDistrictsListFailed(error.message));
  }
}

// Saga function to fetch sector list data
function* getSectorListData() {
  try {
    const response = yield call(sectorList);
    if (response.status === 200) {
      const data = response.data;
      yield put(filtersActions.getSectorsListSuccess(data));
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    // Dispatch action to handle failure
    yield put(filtersActions.getSectorsListFailed(error.message));
  }
}

// Root saga function for filters
export default function* filtersSaga() {
  yield takeLatest(filtersActions.getStatesList.type, getStateListData);
  yield takeLatest(filtersActions.getDistrictsList.type, getDistrictListData);
  yield takeLatest(filtersActions.getSectorsList.type, getSectorListData);
}
