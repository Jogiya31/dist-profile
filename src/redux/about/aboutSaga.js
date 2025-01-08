import { call, put, takeLatest } from "redux-saga/effects";
import { aboutActions } from "./aboutSlice";
import { toast } from "react-toastify";
import { aboutInfo } from "../../api/api";

// Saga function to handle fetching all scheme info
function* handleaboutInfo(data) {
  try {
    // Call API to fetch all scheme info
    const response = yield call(aboutInfo, data);
    if (response.status === 200) {
      // If request is successful, dispatch success action with data payload
      const data = response.data;
      yield put(aboutActions.getaboutInfoSuccess(data));
    } else {
      // If request fails, throw error
      throw new Error("Something went wrong");
    }
  } catch (error) {
    // If error occurs, dispatch failure action and display error message
    toast.error(error.message);
    yield put(aboutActions.getaboutInfoFailed(error.message));
  }
}

// Watcher saga to listen for getaboutInfo action and call handleaboutInfo saga
export default function* aboutSaga() {
  yield takeLatest(
    aboutActions.getaboutInfo.type,
    handleaboutInfo
  );
}
