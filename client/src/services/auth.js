import httpCommon from "../utils/http-common";
import { successNotification, errorNotification } from '../helpers/notifications'
import { loginStart, loginSuccess, loginError } from "../redux/reducers/userSlice";

export const login = ({ email, password }, dispatch) => {
    dispatch(loginStart())
    httpCommon
        .post("/auth/login", { email, password })
        .then((res) => {
            if (res.status === 200) {
                localStorage.setItem('token', res.data.token);
                dispatch(loginSuccess(res.data.data));
                successNotification(res.data.message);
            }
        })
        .catch((err) => {
            errorNotification(err.response.data.message);
            dispatch(loginError())
        });
};

export const googleAuth = (result, dispatch) => {
    dispatch(loginStart())
    httpCommon.post('/auth/google', {
        userName: result.user.displayName,
        email: result.user.email,
        profilePic: result.user.photoURL,
    }).then((res) => {
        if (res.status === 200) {
            localStorage.setItem('token', res.data.token);
            dispatch(loginSuccess(res.data.data));
            successNotification(res.data.message)
        }
    }).catch((err) => {
        errorNotification(err.response.data.message);
        dispatch(loginError())
    });
}