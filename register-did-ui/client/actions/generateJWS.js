import request, { getContextualURL } from "../utils/request";
import { call, put } from "redux-saga/effects";

export const JWS_GEN = "JWS_GEN";
export const JWS_GEN_SUCCESS = "JWS_GEN_SUCCESS";
export const JWS_GEN_FAIL = "JWS_GEN_FAIL";
export const JWS_GEN_PROGRESS = "JWS_GEN_PROGRESS";
export const JWS_GEN_DONE = "JWS_GEN_DONE";

export const genJWS = () => ({
  type: JWS_GEN,
});

const jwsGenInProgress = () => ({
  type: JWS_GEN_PROGRESS,
});

const jwsGenDone = () => ({
  type: JWS_GEN_DONE,
});

const jwsGenSuccess = (response) => ({
  type: JWS_GEN_SUCCESS,
  response,
});

const jwsGenValidateFail = (err) => ({
  type: JWS_GEN_FAIL,
  err,
});

export function* generatorJWS(action) {
  yield put(jwsGenInProgress());

  const JWS_GEN_URL = getContextualURL("did-issuer/generateJWS");

  try {
    const jwsGenResponse = yield call(request, JWS_GEN_URL, {
      method: "POST",
    });
    yield put(jwsGenSuccess(jwsGenResponse.data));
    yield put(jwsGenDone());
  } catch (err) {
    yield put(jwsGenValidateFail(err));
    yield put(jwsGenDone());
  }
}
