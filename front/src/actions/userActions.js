import Axios from "axios";
import Cookie from "js-cookie";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  COL_DETAILS_REQUEST,
  COL_DETAILS_SUCCESS,
  COL_DETAILS_FAIL
} from "../constants/userConstants";

/*const update = ({ userId, name, email, password }) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, name, email, password } });
  try {
    const { data } = await Axios.put("http://localhost:3001/" + userId,
      { name, email, password }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}*/

const signin = (email, password) => async (dispatch) => {
  try {
    const { data } = await Axios.post("http://localhost:3001/login", {
      email,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data && data[0] });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
};
/*
const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  try {
    const { data } = await Axios.post("http://localhost:5000/api/users/register", { name, email, password },config);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
}
*/
const detailsColab = (item) => async (dispatch) => {
  try {
    dispatch({ type: COL_DETAILS_REQUEST, payload: item });
    dispatch({ type: COL_DETAILS_SUCCESS, payload: item });
  } catch (error) {
    dispatch({ type: COL_DETAILS_FAIL, payload: error.message });
  }
};

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT });
};
export { signin, logout,detailsColab };
