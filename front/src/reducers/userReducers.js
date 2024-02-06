import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_LOGOUT,
  COL_DETAILS_REQUEST,
  COL_DETAILS_SUCCESS,
  COL_DETAILS_FAIL
} from "../constants/userConstants";

function userSigninReducer(state = {}, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { loading: true, error: action.payload };
    case USER_SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SIGNIN_FAIL:
      return { loading: false, errorF: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

function colDetailsReducer(state = { Col: { } }, action) {
  switch (action.type) {
    case COL_DETAILS_REQUEST:
      return { loading: true };
    case COL_DETAILS_SUCCESS:
      return { loading: false, Col: action.payload };
    case COL_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

/*
function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}*/
export { userSigninReducer,colDetailsReducer };
