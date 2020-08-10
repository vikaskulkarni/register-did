import { genKey, resetNextButton } from "../actions/generateKeys";
import { genJWS } from "../actions/generateJWS";
import { regJWS } from "../actions/issueVerifiedCredential";
import { connect } from "react-redux";
import GenKeys from "../components/GenKeys";
import GenJWS from "../components/GenJWS";
import IssueVerifiedCredential from "../components/IssueVerifiedCredential";
import { verifyJWS, verifyJWSTextChange } from "../actions/verifyJWS";
import VerifyJWS from "../components/VerifyJWS";
import TopLevelCmp from "../components/TopLevelCmp";

export const TopLevelCtr = connect(
  (state) => ({
    showNextButton: state.keyGenReducer.showNextButton,
    steps: state.topLevelReducer.steps,
  }),
  {}
)(TopLevelCmp);

export const GenKeysCtr = connect(
  (state) => ({ uri: state.keyGenReducer.uri }),
  { genKey, resetNextButton }
)(GenKeys);

export const GenJWSCtr = connect(
  (state) => ({ jwsValue: state.jwsGenReducer.jwsValue }),
  { genJWS, resetNextButton }
)(GenJWS);

export const RegJWSCtr = connect(
  (state) => ({
    did: state.jwsRegReducer.did,
    jwsValue: state.jwsGenReducer.jwsValue,
  }),
  { regJWS, resetNextButton }
)(IssueVerifiedCredential);

export const VerifyJWSCtr = connect(
  (state) => ({
    did: state.jwsRegReducer.did,
    jwsValue: state.jwsVerifyReducer.jwsValue,
  }),
  { verifyJWS, verifyJWSTextChange, resetNextButton }
)(VerifyJWS);

// THIS FILE CAN BE USED TO DEFINE ALL THE DISPLAY CONTAINERS THAT WRAPS THE COMPONENTS
