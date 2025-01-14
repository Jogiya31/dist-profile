import { call, put, takeLatest } from "redux-saga/effects";
import { forecastschemesActions } from "./forecastschemesSlice";
import { toast } from "react-toastify";
import { forecastschemesInfo } from "../../api/api";

// Saga function to handle fetching all scheme info
function* handleforecastschemesInfo(data) {
  try {
    // Call API to fetch all scheme info
    const response = yield call(forecastschemesInfo, data);
    if (response.status === 200) {
      // If request is successful, dispatch success action with data payload
      const data = response.data;
      yield put(forecastschemesActions.getforecastschemesInfoSuccess(data));
    } else {
      // If request fails, throw error
      throw new Error("Something went wrong");
    }
  } catch (error) {
    // If error occurs, dispatch failure action and display error message
    toast.error(error.message);
    yield put(forecastschemesActions.getforecastschemesInfoFailed(error.message));
  }
}

// Watcher saga to listen for getforecastschemesInfo action and call handleforecastschemesInfo saga
export default function* forecastschemesSaga() {
  yield takeLatest(
    forecastschemesActions.getforecastschemesInfo.type,
    handleforecastschemesInfo
  );
}
