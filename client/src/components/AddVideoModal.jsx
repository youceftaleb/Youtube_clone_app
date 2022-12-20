import {
  Box,
  Container,
  Modal,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import propTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { videoSchema } from "../helpers/validation";
import { useEffect, useState } from "react";
import { newVideoUpload, upload } from "../services/fileStorage";
import { useSelector } from "react-redux";
import { VideoCall, AddPhotoAlternate, CloudDone } from "@mui/icons-material";

const style = {
  color: "white",
  height: 60,
  width: 300,
  bgcolor: "#42a5f5",
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  mb: 1,
};

export const AddVideoModal = ({ open, setOpen }) => {
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [videoLoading, setVideoLoading] = useState(0);
  const [thumbnailLoading, setThumbnailLoading] = useState(0);
  const [videoUploadSuccess, setVideoUploadSuccess] = useState("");
  const [thumbnailUploadSuccess, setThumbnailUploadSuccess] = useState("");
  const { dark_mode } = useSelector((state) => state.app);
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
      category.split(" "),
      thumbnailUploadSuccess,
      videoUploadSuccess
    );
  };

  useEffect(() => {
    video ? upload(video, setVideoLoading, setVideoUploadSuccess) : null;
  }, [video]);
  useEffect(() => {
    thumbnail
      ? upload(thumbnail, setThumbnailLoading, setThumbnailUploadSuccess)
      : null;
  }, [thumbnail]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          boxShadow: 24,
          p: 4,
          backgroundColor: dark_mode ? "#0f0f0f" : "white",
        }}
      >
        <Container component="div" maxWidth="xs">
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
                id="title"
                label="Video title"
                name="title"
                focused
                sx={{ input: { color: dark_mode ? "white" : "black" } }}
                {...register("title")}
                error={!!errors?.title}
                helperText={errors?.title ? errors.title.message : null}
              />

              <TextField
                margin="normal"
                id="description"
                label="Video description"
                name="desc"
                focused
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
                      sx={style}
                    >
                      <AddPhotoAlternate sx={{ color: "white" }} />
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
                <Typography sx={{ color: dark_mode ? "white" : "black" }}>
                  <CloudDone />
                  &nbsp; uploaded successfully
                </Typography>
              )}
              {videoLoading < 100 ? (
                videoLoading > 0 ? (
                  <CircularProgress value={videoLoading} />
                ) : (
                  <>
                    <Typography component="label" htmlFor="video" sx={style}>
                      <VideoCall />
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
                <Typography sx={{ color: dark_mode ? "white" : "black" }}>
                  <CloudDone />
                  &nbsp; uploaded successfully
                </Typography>
              )}

              <TextField
                margin="normal"
                id="cat"
                label="Categories"
                name="cat"
                focused
                placeholder="seperate tags with a single space"
                sx={{ input: { color: dark_mode ? "white" : "black" } }}
                {...register("category")}
                error={!!errors?.category}
                helperText={errors?.category ? errors.category.message : null}
              />
              <Button type="submit" variant="outlined" sx={{ mt: 3, mb: 2 }}>
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
