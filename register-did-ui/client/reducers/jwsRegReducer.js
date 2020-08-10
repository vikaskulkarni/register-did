import { JWS_REG, JWS_REG_SUCCESS } from "../actions/issueVerifiedCredential";
import { JWS_VERIFY_TEXT_CHANGE } from "../actions/verifyJWS";

const jwsGenReducer = (state = { did: "NOT_REGISTERED" }, action) => {
  switch (action.type) {
    case JWS_REG:
      return {
        ...state,
      };
    case JWS_REG_SUCCESS:
      return {
        ...state,
        did: action.response.did,
      };
    case JWS_VERIFY_TEXT_CHANGE:
      return {
        ...state,
        did: action.val,
      };
    default:
      return state;
  }
};

export default jwsGenReducer;
