import request, { getContextualURL } from "../utils/request";
import { call, put } from "redux-saga/effects";
import { resetNextButton } from "./generateKeys";

export const JWS_VERIFY = "JWS_VERIFY";
export const JWS_VERIFY_SUCCESS = "JWS_VERIFY_SUCCESS";
export const JWS_VERIFY_FAIL = "JWS_VERIFY_FAIL";
export const JWS_VERIFY_PROGRESS = "JWS_VERIFY_PROGRESS";
export const JWS_VERIFY_DONE = "JWS_VERIFY_DONE";
export const JWS_VERIFY_TEXT_CHANGE = "JWS_VERIFY_TEXT_CHANGE";

export const verifyJWS = (did) => ({
  type: JWS_VERIFY,
  did,
});

export const verifyJWSTextChange = (val) => ({
  type: JWS_VERIFY_TEXT_CHANGE,
  val,
});

const jwsVerifyInProgress = () => ({
  type: JWS_VERIFY_PROGRESS,
});

const jwsVerifyDone = () => ({
  type: JWS_VERIFY_DONE,
});

const jwsVerifySuccess = (response) => ({
  type: JWS_VERIFY_SUCCESS,
  response,
});

const jwsVerifyValidateFail = (err) => ({
  type: JWS_VERIFY_FAIL,
  err,
});

export function* genVerifyJWS(action) {
  yield put(jwsVerifyInProgress());

  const JWS_VERIFY_URL = getContextualURL(`did-verifier/verify/${action.did}`);

  try {
    const jwsVerifyResponse = yield call(request, JWS_VERIFY_URL, {
      method: "GET",
    });
    yield put(jwsVerifySuccess(jwsVerifyResponse.data));
    yield put(resetNextButton(true));
    yield put(jwsVerifyDone());
  } catch (err) {
    yield put(jwsVerifyValidateFail(err));
    yield put(jwsVerifyDone());
  }
}
