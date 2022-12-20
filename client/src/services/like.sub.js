import { darkNotification, errorNotification, successNotification } from "../helpers/notifications"
import { subscribe } from "../redux/reducers/userReducer"
import { Dislike, Like } from "../redux/reducers/videoReducer"
import httpCommon from "../utils/http-common"

export const subscribeService = (currentUser, channel, dispatch) => {
    if (currentUser) {
        currentUser.subscriptions?.includes(channel._id)
            ? (httpCommon.put(`/users/unsub/${channel._id}`).then((res) => successNotification(res.data.message)).catch(err => errorNotification(err.response.data?.message))
                , (channel.subNumber -= 1))
            : (httpCommon.put(`/users/sub/${channel._id}`).then((res) => successNotification(res.data.message)).catch(err => errorNotification(err.response.data?.message))
                , (channel.subNumber += 1));
        dispatch(subscribe(channel?._id));
    } else {
        errorNotification("please login to perform this action");
    }
}


export const likeDislikeService = (currentUser, currentVideo, dispatch, LikeOrDislike) => {
    // check if the user is logged in
    if (currentUser) {
        // check the operation type (like || dislike)
        if (LikeOrDislike === 'like') {
            currentVideo.likes.includes(currentUser._id)
                // remove a like
                ? httpCommon.put(`/videos/rlike/${currentVideo._id}`).then((res) => successNotification(res.data.message)).catch(err => errorNotification(err.response.data?.message))
                // like
                : httpCommon.put(`/videos/like/${currentVideo._id}`).then((res) => successNotification(res.data.message)).catch(err => errorNotification(err.response?.data?.message))
            dispatch(Like(currentUser._id));
        } else {
            currentVideo.dislikes.includes(currentUser._id)
                // remove dislike
                ? httpCommon.put(`/videos/rdislike/${currentVideo._id}`).then((res) => successNotification(res.data.message)).catch(err => errorNotification(err.response.data?.message))
                // dislike
                : httpCommon.put(`/videos/dislike/${currentVideo._id}`).then((res) => darkNotification(res.data.message)).catch(err => errorNotification(err.response.data?.message))
            dispatch(Dislike(currentUser._id));
        }
    } else {
        errorNotification("please login to perform this action");
    }
}