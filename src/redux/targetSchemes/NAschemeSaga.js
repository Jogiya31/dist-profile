import { call, put, takeLatest } from "redux-saga/effects";
import { NAschemesActions } from "./NAschemesSlice";
import { toast } from "react-toastify";
import { NAschemesInfo } from "../../api/api";

// Saga function to handle fetching all scheme info
function* handleNAschemesInfo(data) {
  try {
    // Call API to fetch all scheme info
    const response = yield call(NAschemesInfo, data);
    if (response.status === 200) {
      // If request is successful, dispatch success action with data payload
      const data = response.data;
      yield put(NAschemesActions.getNAschemesInfoSuccess(data));
    } else {
      // If request fails, throw error
      throw new Error("Something went wrong");
    }
  } catch (error) {
    // If error occurs, dispatch failure action and display error message
    toast.error(error.message);
    yield put(NAschemesActions.getNAschemesInfoFailed(error.message));
  }
}

// Watcher saga to listen for getNAschemesInfo action and call handleNAschemesInfo saga
export default function* NAschemesSaga() {
  yield takeLatest(
    NAschemesActions.getNAschemesInfo.type,
    handleNAschemesInfo
  );
}
