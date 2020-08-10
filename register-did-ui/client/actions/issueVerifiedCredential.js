import request, { getContextualURL } from "../utils/request";
import { call, put } from "redux-saga/effects";
import { resetNextButton } from "./generateKeys";

export const JWS_REG = "JWS_REG";
export const JWS_REG_SUCCESS = "JWS_REG_SUCCESS";
export const JWS_REG_FAIL = "JWS_REG_FAIL";
export const JWS_REG_PROGRESS = "JWS_REG_PROGRESS";
export const JWS_REG_DONE = "JWS_REG_DONE";

export const regJWS = (payload) => ({
  type: JWS_REG,
  payload,
});

const jwsRegInProgress = () => ({
  type: JWS_REG_PROGRESS,
});

const jwsRegDone = () => ({
  type: JWS_REG_DONE,
});

const jwsRegSuccess = (response) => ({
  type: JWS_REG_SUCCESS,
  response,
});

const jwsRegValidateFail = (err) => ({
  type: JWS_REG_FAIL,
  err,
});

export function* genIssueVerifiedCredential(action) {
  yield put(jwsRegInProgress());

  const JWS_REG_URL = getContextualURL("did-issuer/issueVerifiedCredential");
  const payload = {
    encodedJWS: action.payload,
  };

  try {
    const jwsRegResponse = yield call(request, JWS_REG_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    yield put(jwsRegSuccess(jwsRegResponse.data));
    yield put(resetNextButton(true));
    yield put(jwsRegDone());
  } catch (err) {
    yield put(jwsRegValidateFail(err));
    yield put(jwsRegDone());
  }
}
