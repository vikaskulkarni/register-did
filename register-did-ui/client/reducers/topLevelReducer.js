import React from "react";
import {
  GenKeysCtr,
  GenJWSCtr,
  RegJWSCtr,
  VerifyJWSCtr,
} from "../containers/CombinedContainers";
import SuccessComponent from "../components/SuccessComponent";

const initialState = {
  steps: [
    { name: "Generate Keys", component: <GenKeysCtr /> },
    { name: "Generate JWS", component: <GenJWSCtr /> },
    { name: "Register JWS", component: <RegJWSCtr /> },
    { name: "Verify JWS", component: <VerifyJWSCtr /> },
    { name: "Done", component: <SuccessComponent /> },
  ],
};

const jwsGenReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default jwsGenReducer;
