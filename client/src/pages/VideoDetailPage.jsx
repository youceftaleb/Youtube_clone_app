import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Videos } from "../components/Videos";

import { useDispatch, useSelector } from "react-redux";
import httpCommon from "../utils/http-common";

const VideoDetailPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  // const dispatch = useDispatch();
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState(null);
  const [channel, setChannel] = useState(null);
  useEffect(() => {
    httpCommon
      .get(`/videos/${id}`)
      .then((res) => {
        httpCommon
          .get(`/users/${res.data.data.userId}`)
          .then((res) => {
            setChannel(res.data.data);
          })
          .catch((err) => console.log(err));
        setVideo(res.data.data);
        // dispatch(fetchSuccess(res.data.data));
      })
      .catch((err) => console.log(err));
    httpCommon
      .get("/videos/random")
      .then((res) => setVideos(res.data.data))
      .catch((err) => console.log(err));
  }, [id]);
  //dispatch
  console.log(videos);
  console.log(channel);

  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <ReactPlayer
              className="react-player"
              url={"https://www.youtube.com/watch?v=LXb3EKWsInQ"}
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {video?.title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${video?.userId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h6" }}
                  color="#fff"
                >
                  {channel?.userName}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "grey", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(video?.views).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {video?.likes.length} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ md: 1, xs: 5 }}
          justifyContent="center"
          alignItems="center"
        >
          {videos ? <Videos videos={videos} direction="column" /> : null}
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetailPage;
