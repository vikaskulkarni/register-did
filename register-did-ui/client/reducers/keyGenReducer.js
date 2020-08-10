import { GEN_KEY, KEY_GEN_SUCCESS, RESET_NEXT } from "../actions/generateKeys";

const keyGenReducer = (state = { showNextButton: false }, action) => {
  switch (action.type) {
    case GEN_KEY:
      return {
        ...state,
      };
    case KEY_GEN_SUCCESS:
      return {
        ...state,
        uri: action.uri,
      };
    case RESET_NEXT:
      return {
        ...state,
        showNextButton: action.value,
      };
    default:
      return state;
  }
};

export default keyGenReducer;
