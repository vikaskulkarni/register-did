import { takeLatest, put, call } from "redux-saga/effects";
import { GEN_KEY, genPublicPrivateKey } from "../actions/generateKeys";
import { JWS_GEN, generatorJWS } from "../actions/generateJWS";
import {
  JWS_REG,
  genIssueVerifiedCredential,
} from "../actions/issueVerifiedCredential";
import { JWS_VERIFY, genVerifyJWS } from "../actions/verifyJWS";

export function* watchSagas() {
  yield takeLatest(GEN_KEY, genPublicPrivateKey);
  yield takeLatest(JWS_GEN, generatorJWS);
  yield takeLatest(JWS_REG, genIssueVerifiedCredential);
  yield takeLatest(JWS_VERIFY, genVerifyJWS);
}
