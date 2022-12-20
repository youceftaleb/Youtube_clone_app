import { errorNotification, successNotification } from "../helpers/notifications";
import { logout, setUser } from "../redux/reducers/userReducer";
import httpCommon from "../utils/http-common";

export const modifyUserName = (dispatch, userId, value, setOpen) => {
    if (!value) {
        errorNotification("please edit your comment before submitting");
    } else {
        httpCommon
            .put(`/users/${userId}`, { userName: value })
            .then((res) => {
                dispatch(setUser(res.data.data));
                successNotification(res.data.message);
                setOpen(false);
            })
            .catch((err) => errorNotification(err.response.data.message));
    }
}

export const deleteUser = (dispatch, id) => {
    httpCommon
        .delete(`/users/${id}`)
        .then((res) => {
            successNotification("Account deleted succefully");
            dispatch(logout());
            location = "/";
        })
        .catch((err) => errorNotification(err.response.data.message));
}

export const fetchChannelAndItsVideos = (id, setChannel, setVideos) => {
    httpCommon
        .get(`/users/${id}`)
        .then((res) => setChannel(res.data.data))
        .catch((err) => errorNotification(err.response.data.message));
    httpCommon
        .get(`/videos/user/${id}`)
        .then((res) => setVideos(res.data.data))
        .catch((err) => errorNotification(err.response.data.message));
}