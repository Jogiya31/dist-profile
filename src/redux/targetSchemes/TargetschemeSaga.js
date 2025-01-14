import { call, put, takeLatest } from "redux-saga/effects";
import { TargetschemesActions } from "./TargetschemesSlice";
import { toast } from "react-toastify";
import { TargetschemesInfo } from "../../api/api";

// Saga function to handle fetching all scheme info
function* handleTargetschemesInfo(data) {
  try {
    // Call API to fetch all scheme info
    const response = yield call(TargetschemesInfo, data);
    if (response.status === 200) {
      // If request is successful, dispatch success action with data payload
      const data = response.data;
      yield put(TargetschemesActions.getTargetschemesInfoSuccess(data));
    } else {
      // If request fails, throw error
      throw new Error("Something went wrong");
    }
  } catch (error) {
    // If error occurs, dispatch failure action and display error message
    toast.error(error.message);
    yield put(TargetschemesActions.getTargetschemesInfoFailed(error.message));
  }
}

// Watcher saga to listen for getTargetschemesInfo action and call handleTargetschemesInfo saga
export default function* TargetschemesSaga() {
  yield takeLatest(
    TargetschemesActions.getTargetschemesInfo.type,
    handleTargetschemesInfo
  );
}
