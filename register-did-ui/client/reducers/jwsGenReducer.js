import { JWS_GEN, JWS_GEN_SUCCESS } from "../actions/generateJWS";

const jwsGenReducer = (state = {}, action) => {
  switch (action.type) {
    case JWS_GEN:
      return {
        ...state,
      };
    case JWS_GEN_SUCCESS:
      return {
        ...state,
        jwsValue: action.response,
      };
    default:
      return state;
  }
};

export default jwsGenReducer;
