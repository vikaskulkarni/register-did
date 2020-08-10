export const GET_IP = "GET_IP";
export const GET_IP_SUCCESS = "GET_IP_SUCCESS";
export const GET_IP_FAIL = "GET_IP_FAIL";

export function getIP(ip) {
  return {
    type: GET_IP,
    ip,
  };
}

export function getIPSuccess(ip) {
  return {
    type: GET_IP_SUCCESS,
    ip,
  };
}

export function getIPFail(error) {
  return {
    type: GET_IP_FAIL,
    error,
  };
}
