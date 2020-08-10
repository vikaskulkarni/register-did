import request, { getContextualURL } from "../utils/request";
import { call, put } from "redux-saga/effects";

export const RESET_NEXT = "RESET_NEXT";

export const GEN_KEY = "GEN_KEY";

export const KEY_GEN = "KEY_GEN";
export const KEY_GEN_SUCCESS = "KEY_GEN_SUCCESS";
export const KEY_GEN_FAIL = "KEY_GEN_FAIL";
export const KEY_GEN_PROGRESS = "KEY_GEN_PROGRESS";
export const KEY_GEN_DONE = "KEY_GEN_DONE";

export const resetNextButton = (value) => ({
  type: RESET_NEXT,
  value,
});

export const genKey = () => ({
  type: GEN_KEY,
});

const keyGenInProgress = () => ({
  type: KEY_GEN_PROGRESS,
});

const keyGenDone = () => ({
  type: KEY_GEN_DONE,
});

const keyGenSuccess = (uri) => ({
  type: KEY_GEN_SUCCESS,
  uri,
});

const keyGenValidateFail = (err) => ({
  type: KEY_GEN_FAIL,
  err,
});

export function* genPublicPrivateKey(action) {
  yield put(keyGenInProgress());

  const KEY_GEN_URL = getContextualURL("did-issuer/generateKeys");

  try {
    const keyGenResponse = yield call(request, KEY_GEN_URL, {
      method: "POST",
    });
    yield put(keyGenSuccess(keyGenResponse.data.uri));
    yield put(resetNextButton(true));
    yield put(keyGenDone());
  } catch (err) {
    yield put(keyGenValidateFail(err));
    yield put(keyGenDone());
  }
}
