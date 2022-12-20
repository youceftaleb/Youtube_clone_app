import { darkNotification, errorNotification, successNotification } from "../helpers/notifications";
import { addComment, deleteOneComment, editComment } from "../redux/reducers/videoReducer";
import httpCommon from "../utils/http-common";


export const deleteCommentServer = (dispatch, id) => {
    httpCommon
        .delete(`/comments/${id}`)
        .then((res) => {
            dispatch(deleteOneComment(id));
            darkNotification(res.data.message);
        })
        .catch((err) => errorNotification(err.response.data.message));
}

export const addCommentServer = (dispatch, videoId, value) => {
    if (!value) {
        errorNotification("comment is empty");
    } else {
        httpCommon
            .post(`/comments/${videoId}`, { text: value })
            .then((res) => {
                if (res.status === 200) {
                    dispatch(addComment(res.data.data));
                    successNotification(res.data.message);
                }
            })
            .catch((err) => errorNotification(err.response.data.message));
    }
}

export const editCommentServer = (dispatch, id, value, setOpen) => {
    if (!value) {
        errorNotification("please edit your comment before submitting");
    } else {
        httpCommon
            .put(`/comments/${id}`, { text: value })
            .then((res) => {
                dispatch(editComment([id, value]));
                successNotification(res.data.message);
                setOpen(false);
            })
            .catch((err) => errorNotification(err.response.data.message));
    }
}