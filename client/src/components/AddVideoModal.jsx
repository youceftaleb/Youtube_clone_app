import {
  Box,
  Container,
  Modal,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import app from "../services/firebase";
import propTypes from "prop-types";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import { v4 as uuidv4 } from "uuid";
import AddImage from "@mui/icons-material/AddPhotoAlternate";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { videoSchema } from "../helpers/validation";
import AddVideo from "@mui/icons-material/VideoCall";
import { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { newVideoUpload } from "../services/videoUpload";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  p: 4,
  color: "white",
};

const InputStyle = {
  color: "white",
  height: 60,
  width: 250,
  bgcolor: "#42a5f5",
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  mb: 1,
};

export const AddVideoModal = ({ open, setOpen }) => {
  const { dark_mode } = useSelector((state) => state.app);
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);
  const [thumbnailLoading, setThumbnailLoading] = useState(0);
  const [videoLoading, setVideoLoading] = useState(0);
  const [videoUploadSuccess, setVideoUploadSuccess] = useState("");
  const [thumbnailUploadSuccess, setThumbnailUploadSuccess] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(videoSchema) });
  const onSubmit = (data) => {
    const { title, desc, category } = data;
    newVideoUpload(
      title,
      desc,
      category,
      thumbnailUploadSuccess,
      videoUploadSuccess
    );
  };
  const upload = (file, urlType) => {
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
        urlType === "thumbnailUrl"
          ? setThumbnailLoading(Math.round(progress))
          : setVideoLoading(Math.round(progress));
      },
      (error) => {},
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          urlType === "thumbnailUrl"
            ? setThumbnailUploadSuccess(downloadURL)
            : setVideoUploadSuccess(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    video ? upload(video, "videoUrl") : null;
  }, [video]);
  useEffect(() => {
    thumbnail ? upload(thumbnail, "thumbnailUrl") : null;
  }, [thumbnail]);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...style,
          backgroundColor: dark_mode ? "#0f0f0f" : "white",
          border: `1px solid ${dark_mode ? "white" : "black"}`,
        }}
      >
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ color: dark_mode ? "white" : "black" }}
            >
              Create a new video
            </Typography>
            <form
              noValidate
              style={{ marginTop: 1, display: "flex", flexDirection: "column" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Video title"
                name="title"
                autoComplete="title"
                focused
                sx={{ input: { color: dark_mode ? "white" : "black" } }}
                {...register("title")}
                error={!!errors?.title}
                helperText={errors?.title ? errors.title.message : null}
              />

              <TextField
                rows={2}
                margin="normal"
                fullWidth
                id="description"
                label="Video description"
                name="desc"
                autoComplete="description"
                focused
                placeholder="add a video description here"
                sx={{ input: { color: dark_mode ? "white" : "black" } }}
                {...register("desc")}
                error={!!errors?.desc}
                helperText={errors?.desc ? errors.desc.message : null}
              />
              {thumbnailLoading < 100 ? (
                thumbnailLoading > 0 ? (
                  <CircularProgress value={thumbnailLoading} />
                ) : (
                  <>
                    <Typography
                      component="label"
                      htmlFor="thumbnail"
                      sx={InputStyle}
                    >
                      <AddImage sx={{ color: "white" }} />
                      &nbsp; Choose a photo
                    </Typography>
                    <input
                      type="file"
                      accept="image/*"
                      id="thumbnail"
                      name="thumbnail"
                      style={{ display: "none" }}
                      onChange={(e) => setThumbnail(e.target.files[0])}
                    />
                  </>
                )
              ) : (
                <Typography>
                  <CloudDoneIcon />
                  &nbsp; uploaded successfully
                </Typography>
              )}
              {videoLoading < 100 ? (
                videoLoading > 0 ? (
                  <CircularProgress value={videoLoading} />
                ) : (
                  <>
                    <Typography
                      component="label"
                      htmlFor="video"
                      sx={InputStyle}
                    >
                      <AddVideo />
                      &nbsp; Add a video
                    </Typography>
                    <input
                      type="file"
                      accept="video/*"
                      id="video"
                      style={{ display: "none" }}
                      onChange={(e) => setVideo(e.target.files[0])}
                    />
                  </>
                )
              ) : (
                <Typography>
                  <CloudDoneIcon />
                  &nbsp; uploaded successfully
                </Typography>
              )}

              <TextField
                margin="normal"
                fullWidth
                id="cat"
                label="Categories"
                name="cat"
                autoComplete="categories"
                focused
                placeholder="seperate tags with a comma"
                sx={{ input: { color: dark_mode ? "white" : "black" } }}
                {...register("category")}
                error={!!errors?.category}
                helperText={errors?.category ? errors.category.message : null}
              />
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
              >
                Add
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
    </Modal>
  );
};

AddVideoModal.propTypes = {
  open: propTypes.bool.isRequired,
  setOpen: propTypes.func.isRequired,
};
