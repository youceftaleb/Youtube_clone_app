import httpCommon from "../utils/http-common";
import { successNotification, errorNotification } from '../helpers/notifications'
import { loginStart, loginSuccess, loginError } from "../redux/reducers/userSlice";

export const login = ({ email, password }, dispatch) => {
    dispatch(loginStart())
    httpCommon
        .post("/auth/login", { email, password })
        .then((res) => {
            if (res.status === 200) {
                const data = res.data.data;
                // sessionStorage.setItem("token", JSON.stringify(data));
                dispatch(loginSuccess(data));
                successNotification(res.data.message)
                    ;
                // setTimeout(() => {
                //     window.location = "/hello";
                // }, 2000);
            }
        })
        .catch((err) => {
            errorNotification(err.response.data.message);
            dispatch(loginError())
        });
};