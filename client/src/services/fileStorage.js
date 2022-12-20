import httpCommon from "../utils/http-common"
import { errorNotification, successNotification } from '../helpers/notifications'
import {
    getStorage, ref, deleteObject,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from './firebase'
import { v4 as uuidv4 } from "uuid";

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


const deleteFile = (fileUrl) => {
    try {
        const storage = getStorage(app);
        // Create a reference to the file to delete
        const desertRef = ref(storage, fileUrl);
        // Delete the file
        deleteObject(desertRef).then(() => { }).catch((error) => {
            errorNotification('there has been an error')
            console.log(error)
        });
    } catch (error) {
        console.log(error)
    }

}
export const deleteVideo = (video) => {
    deleteFile(video.videoUrl.split("/").at(-1).split("?")[0]);
    deleteFile(video.thumbnailUrl.split("/").at(-1).split("?")[0]);
    httpCommon.delete(`/videos/${video._id}`)
        .then(res => successNotification(res.data.message))
        .catch(err => console.log(err.response.data.message))
    location.pathname === `/video/${video._id}` ? location = '/' : location.reload()

}

export const modifyProfilePic = (user, newPicUrl) => {
    deleteFile(user?.profilePic.split("/").at(-1).split("?")[0]);
    console.log('hi boy')
    httpCommon.put(`/users/${user._id}`, { profilePic: newPicUrl })
        .then(res => {
            successNotification('updated successfully')
            location.reload()
        })
        .catch(err => errorNotification(err.response.data.message))
}

export const upload = (file, setLoading, setSuccess) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, uuidv4() + "-" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setLoading(Math.round(progress))
        },
        (error) => {
            console.log(error.message)
            setLoading(0);
        },
        () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setSuccess(downloadURL)
            });
        }
    );
};