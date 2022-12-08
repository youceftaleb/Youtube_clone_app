import { errorNotification, lightNotification, successNotification } from "../helpers/notifications"
import httpCommon from "../utils/http-common"

export const like = (id) => {
    httpCommon.put(`/videos/like/${id}`).then((res) => successNotification('success', {})).catch(err => errorNotification(err.response?.data?.message))
}
export const dislike = (id) => {
    httpCommon.put(`/videos/dislike/${id}`).then((res) => lightNotification('success')).catch(err => errorNotification(err.response.data?.message))
}
export const sub = (id) => {
    httpCommon.put(`/users/sub/${id}`).then((res) => successNotification('success', {})).catch(err => errorNotification(err.response.data?.message))
}
export const unsub = (id) => {
    httpCommon.put(`/users/unsub/${id}`).then((res) => successNotification('success', {})).catch(err => errorNotification(err.response.data?.message))
}