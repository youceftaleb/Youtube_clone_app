import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Typography, Box, Stack, Divider, Button } from "@mui/material";
import { Videos, AVATAR, Comments } from "../components";
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import httpCommon from "../utils/http-common";
import { fetchSuccess } from "../redux/reducers/videoReducer";
import {
  Reply,
  ThumbDownOutlined,
  ThumbDown,
  ThumbUpOutlined,
  ThumbUp,
  CheckCircle,
} from "@mui/icons-material";
import { likeDislikeService, subscribeService } from "../services/like.sub";
import { formatter } from "../helpers/numberFormater";

const VideoDetailPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const { dark_mode } = useSelector((state) => state.app);
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

  const LikeDislike = (opType) => {
    likeDislikeService(currentUser, currentVideo, dispatch, opType);
  };
  const handleSubscribe = () => {
    subscribeService(currentUser, channel, dispatch);
  };
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
                src={currentVideo?.videoUrl || ""}
                frameBorder="0"
                allowFullScreen={true}
                height="77vh"
                width="100%"
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
            <Typography
              color={dark_mode ? "#fff" : "black"}
              variant="h5"
              fontWeight="bold"
              p={2}
            >
              {currentVideo?.title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: dark_mode ? "#fff" : "black" }}
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
                    <ThumbUp
                      sx={{ cursor: "pointer" }}
                      onClick={() => LikeDislike("like")}
                    />
                  ) : (
                    <ThumbUpOutlined
                      sx={{ cursor: "pointer" }}
                      onClick={() => LikeDislike("like")}
                    />
                  )}{" "}
                  {currentVideo?.likes?.length}
                </Typography>
                <Typography variant="body1">
                  {currentVideo?.dislikes?.includes(currentUser?._id) ? (
                    <ThumbDown
                      sx={{ cursor: "pointer" }}
                      onClick={() => LikeDislike("dislike")}
                    />
                  ) : (
                    <ThumbDownOutlined
                      sx={{ cursor: "pointer" }}
                      onClick={() => LikeDislike("dislike")}
                    />
                  )}{" "}
                  {currentVideo?.dislikes?.length}
                </Typography>
                <Typography variant="body1">
                  <Reply sx={{ cursor: "pointer" }} /> Share
                </Typography>
              </Stack>
            </Stack>
            <Divider variant="middle" sx={{ bgcolor: "#757575" }} />
            <Stack direction="row" justifyContent="space-between" py={1} px={2}>
              <Link to={`/channel/${currentVideo?.userId}`}>
                <Stack direction="row">
                  <AVATAR user={channel} />
                  <Box px={1}>
                    <Typography
                      sx={{ sm: "subtitle1", md: "h6" }}
                      color={dark_mode ? "#fff" : "black"}
                    >
                      {channel?.userName}
                      {channel?.subNumber > 1000 ? (
                        <CheckCircle
                          sx={{ fontSize: "12px", color: "grey", ml: "5px" }}
                        />
                      ) : null}
                    </Typography>
                    <Typography
                      sx={{ sm: "subtitle2", md: "body2" }}
                      color={dark_mode ? "#fff" : "black"}
                    >
                      {formatter.format(channel?.subNumber)} Subscribers
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
              <Typography
                variant="body1"
                sx={{ opacity: 0.7, color: dark_mode ? "#fff" : "black" }}
              >
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
