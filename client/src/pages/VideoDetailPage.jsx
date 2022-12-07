import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Divider, Button, Avatar } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Videos } from "../components/Videos";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import httpCommon from "../utils/http-common";
import { fetchSuccess } from "../redux/reducers/videoSlice";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import { AVATAR } from "../components";

const VideoDetailPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const { id } = useParams();
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
        dispatch(fetchSuccess(res.data.data));
      })
      .catch((err) => console.log(err));
    httpCommon
      .get("/videos/random")
      .then((res) => setVideos(res.data.data))
      .catch((err) => console.log(err));
  }, [id, dispatch]);

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
              {currentVideo?.title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Typography variant="body1" sx={{ opacity: 0.7 }}>
                {parseInt(currentVideo?.views).toLocaleString()} views •{" "}
                {format(currentVideo?.createdAt)}
              </Typography>
              <Stack direction="row" gap="20px">
                <Typography variant="body1">
                  {currentVideo?.likes?.includes(currentUser?._id) ? (
                    <ThumbUpIcon sx={{ cursor: "pointer" }} />
                  ) : (
                    <ThumbUpOutlinedIcon sx={{ cursor: "pointer" }} />
                  )}{" "}
                  {currentVideo?.likes?.length}
                </Typography>
                <Typography variant="body1">
                  {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                    <ThumbDownIcon sx={{ cursor: "pointer" }} />
                  ) : (
                    <ThumbDownOutlinedIcon sx={{ cursor: "pointer" }} />
                  )}{" "}
                  {currentVideo?.dislikes?.length}
                </Typography>
                <Typography variant="body1">
                  <ReplyIcon sx={{ cursor: "pointer" }} /> Share
                </Typography>
              </Stack>
            </Stack>
            <Divider variant="middle" sx={{ bgcolor: "#757575" }} />
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${currentVideo?.userId}`}>
                <Stack direction="row">
                  <AVATAR user={channel} />
                  <Box px={1}>
                    <Typography sx={{ sm: "subtitle1", md: "h6" }} color="#fff">
                      {channel?.userName}
                      <CheckCircle
                        sx={{ fontSize: "12px", color: "grey", ml: "5px" }}
                      />
                    </Typography>
                    <Typography
                      sx={{ sm: "subtitle2", md: "body2" }}
                      color="#fff"
                    >
                      {channel?.subNumber} Subscribers
                    </Typography>
                  </Box>
                </Stack>
              </Link>
              <Button variant="contained" color="error" sx={{ px: "auto" }}>
                subscribe
              </Button>
            </Stack>
            <Divider variant="middle" sx={{ bgcolor: "#757575" }} />
            <Stack py={1} px={2}>
              <Typography variant="body1" sx={{ opacity: 0.7, color: "#fff" }}>
                {currentVideo?.desc}
              </Typography>
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
