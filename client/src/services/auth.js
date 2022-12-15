import httpCommon from "../utils/http-common";
import { successNotification, errorNotification, infoNotification, darkNotification } from '../helpers/notifications'
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
                setTimeout(() => {
                    location.reload();
                }, 3000);
            }
        })
        .catch((err) => {
            errorNotification(err.response.data.message);
            dispatch(loginError())
        });
};

export const signUp = ({ userName, email, password }) => {
    httpCommon.post('/auth/register', { email, password, userName })
        .then(res => {
            if (res.status === 201) {
                successNotification(res.data.message);
            }
        }).catch(err => {
            if (err.response.status === 409) {
                infoNotification(err.response.data.message)
            } else {
                errorNotification(err.response.data.message)
            }
        })
}

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
            successNotification(res.data.message);
            setTimeout(() => {
                location.reload()
            }, 3000);
        }
    }).catch((err) => {
        errorNotification(err.response.data.message);
        dispatch(loginError())
    });
}