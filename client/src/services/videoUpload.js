import httpCommon from "../utils/http-common"
import { errorNotification, successNotification } from '../helpers/notifications'

export const newVideoUpload = (title, desc, category, thumbnailUrl, videoUrl) => {
    httpCommon.post('/videos', { title, desc, category, thumbnailUrl, videoUrl }).then(res => {
        if (res.status === 200) {
            successNotification(res.data.message);
            setTimeout(() => {
                location = `/video/${res.data.data._id}`
            }, 3000);
        }
    }).catch(err => errorNotification(err.response.data?.message))
}