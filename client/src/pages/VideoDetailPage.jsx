import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack, Divider, Button } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Videos } from "../components/Videos";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import httpCommon from "../utils/http-common";
import { fetchSuccess, Like, Dislike } from "../redux/reducers/videoReducer";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ReplyIcon from "@mui/icons-material/Reply";
import { AVATAR } from "../components";
import {
  like,
  dislike,
  removeLike,
  removeDislike,
  sub,
  unsub,
} from "../services/like.sub";
import { subscribe } from "../redux/reducers/userReducer";
import { Comments } from "../components";
import { errorNotification } from "../helpers/notifications";

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

  const handleLike = () => {
    if (currentUser) {
      currentVideo.likes.includes(currentUser._id)
        ? removeLike(currentVideo._id)
        : like(currentVideo._id);
      dispatch(Like(currentUser._id));
    } else {
      errorNotification("please login to perform this action");
    }
  };
  const handleDislike = () => {
    if (currentUser) {
      currentVideo.dislikes.includes(currentUser._id)
        ? removeDislike(currentVideo._id)
        : dislike(currentVideo._id);
      dispatch(Dislike(currentUser._id));
    } else {
      errorNotification("please login to perform this action");
    }
  };
  const handleSubscribe = () => {
    if (currentUser) {
      currentUser.subscriptions?.includes(channel._id)
        ? (unsub(channel._id), (channel.subNumber -= 1))
        : (sub(channel._id), (channel.subNumber += 1));
      dispatch(subscribe(channel?._id));
    } else {
      errorNotification("please login to perform this action");
    }
  };
  // console.log(currentUser)
  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                width: "100%",
                paddingTop: "56.25%",
              }}
            >
              <iframe
                src={currentVideo?.videoUrl}
                frameBorder="0"
                allowFullScreen={true}
                height="500"
                width="1200"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
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
                    <ThumbUpIcon
                      sx={{ cursor: "pointer" }}
                      onClick={handleLike}
                    />
                  ) : (
                    <ThumbUpOutlinedIcon
                      sx={{ cursor: "pointer" }}
                      onClick={handleLike}
                    />
                  )}{" "}
                  {currentVideo?.likes?.length}
                </Typography>
                <Typography variant="body1">
                  {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                    <ThumbDownIcon
                      sx={{ cursor: "pointer" }}
                      onClick={handleDislike}
                    />
                  ) : (
                    <ThumbDownOutlinedIcon
                      sx={{ cursor: "pointer" }}
                      onClick={handleDislike}
                    />
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
              {currentUser?._id === channel?._id ? null : (
                <Button
                  onClick={handleSubscribe}
                  variant={
                    currentUser?.subscriptions?.includes(channel?._id)
                      ? "outlined"
                      : "contained"
                  }
                  color="error"
                  sx={{ px: "auto" }}
                >
                  {currentUser?.subscriptions?.includes(channel?._id)
                    ? "Subscribed"
                    : "Subscribe"}
                </Button>
              )}
            </Stack>
            <Divider variant="middle" sx={{ bgcolor: "#757575" }} />
            <Stack py={1} px={2}>
              <Typography variant="body1" sx={{ opacity: 0.7, color: "#fff" }}>
                {currentVideo?.desc}
              </Typography>
            </Stack>
            <Comments videoId={currentVideo?._id} />
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
