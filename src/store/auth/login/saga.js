import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
  postLogout,
  getRolePermission as getRolePermissionApi,
} from "../../../helpers/fakebackend_helper";

//import {setAuthorization} from '../../../helpers/api_helper';

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { user, history } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const response = yield call(
        fireBaseBackend.loginUser,
        user.username,
        user.password
      );
      yield put(loginSuccess(response));
    } 
    else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
        const response = yield call(postJwtLogin, {
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));

    } 
    else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {

        const response = yield call(postFakeLogin, {
        username: user.username,
        password: user.password,
      });
      if(response){
        localStorage.setItem("loginSuccess", true);
      }

      localStorage.setItem("authUser", JSON.stringify(response));

      localStorage.setItem("authToken", response.user_token);
      
      const permissions =  yield call (getRolePermissionApi);


      let CryptoJS = require("crypto-js");

      let data = JSON.stringify(permissions.permissions);

      let encrypted = CryptoJS.AES.encrypt(data, process.env.REACT_APP_ENCRYPTION_KEY);

      localStorage.setItem("permissions", encrypted);
      

      yield put(loginSuccess(response));

      
      history.replace("/dashboard");
    }

  } 
  catch (error) {
    localStorage.setItem("loginError", true);
    yield put(apiError(error[0]));
  }
}

function* logoutUser({payload:{history}}) {
  try {
    
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      localStorage.clear()
      yield put(logoutUserSuccess(LOGOUT_USER, response));
    } else {
        try {

            const response = yield call(postLogout);
            localStorage.clear()
            yield put(logoutUserSuccess(LOGOUT_USER, true));

        } catch (error) {
            if(error[1] === 401){
                localStorage.clear()
                history.push("/login")
            }
            else{
                localStorage.clear()
                yield put(apiError(LOGOUT_USER, error))
            }
        }
      
    //   console.log(response);
      
      
    }
  } catch (error) {
    yield put(apiError(LOGOUT_USER, error));
  }
}

function* socialLogin({ payload: { data, history, type } }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      const response = yield call(
        fireBaseBackend.socialLoginUser,
        data,
        type,
      );
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    } else {
      const response = yield call(postSocialLogin, data);
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
    }
    history.push("/dashboard");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
