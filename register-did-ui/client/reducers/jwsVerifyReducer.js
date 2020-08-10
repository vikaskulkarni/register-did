import { JWS_VERIFY, JWS_VERIFY_SUCCESS } from "../actions/verifyJWS";

const jwsVerifyReducer = (state = {}, action) => {
  switch (action.type) {
    case JWS_VERIFY:
      return {
        ...state,
      };
    case JWS_VERIFY_SUCCESS:
      return {
        ...state,
        jwsValue: action.response.signedVC,
      };

    default:
      return state;
  }
};

export default jwsVerifyReducer;
