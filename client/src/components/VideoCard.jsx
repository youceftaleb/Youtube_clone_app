import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Box,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import propTypes from "prop-types";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import http from "../utils/http-common";
import { useSelector } from "react-redux";
import { Delete } from "@mui/icons-material";
import { deleteVideo } from "../services/fileStorage";
import { Addview } from "../services/like.sub";
import { formatter } from "../helpers/numberFormater";

export const VideoCard = ({ video }) => {
  const [channel, setChannel] = useState(null);
  const { dark_mode } = useSelector((state) => state.app);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    http.get(`/users/${video.userId}`).then((res) => {
      setChannel(res.data.data);
    });
  }, [video.userId]);
  const handleDeleteVideo = () => {
    deleteVideo(video);
  };
  return (
    <>
      {video && channel ? (
        <Card
          sx={{
            width: { xs: "90vw", md: "300px" },
            boxShadow: "none",
            borderRadius: 0,
            background: "transparent",
          }}
        >
          <Link onClick={() => Addview(video._id)} to={`/video/${video._id}`}>
            <CardMedia
              image={video?.thumbnailUrl}
              alt={video?.title}
              sx={{
                width: { xs: "90vw", md: "300px" },
                height: { xs: "250px", sm: "300px", md: "180px" },
                borderRadius: 5,
              }}
            />
          </Link>
          <CardContent sx={{ backgroundColor: "transparent", height: "80px" }}>
            <Link onClick={() => Addview(video._id)} to={`/video/${video._id}`}>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color={dark_mode ? "white" : "black"}
              >
                {video?.title.slice(0, 60)}
              </Typography>
              <Typography
                sx={{ fontSize: 12, opacity: 0.7 }}
                color={dark_mode ? "white" : "black"}
              >
                {formatter.format(video?.views)} views •{" "}
                {format(video?.createdAt)}
              </Typography>
            </Link>
            {/* // !channel card */}
            <Link to={`/channel/${channel?._id}`}>
              <Typography variant="subtitle2" fontWeight="bold" color="gray">
                {channel?.userName}
                {channel?.subNumber > 1000 ? (
                  <CheckCircle
                    sx={{ fontSize: 12, color: "gray", ml: "5px" }}
                  />
                ) : null}
              </Typography>
            </Link>
            {currentUser?._id === channel?._id ? (
              <Delete
                onClick={handleDeleteVideo}
                className="action-icon"
                sx={{
                  cursor: "pointer",
                  color: dark_mode ? "white" : "black",
                  opacity: 0.3,
                }}
              />
            ) : null}
          </CardContent>
        </Card>
      ) : (
        <>
          <Skeleton
            variant="rectangular"
            sx={{
              width: { xs: "100%", md: "300px" },
              borderRadius: 5,
              bgcolor: dark_mode ? "grey.800" : "",
            }}
            height={160}
          />
          <Box sx={{ pt: 0.5 }}>
            <Skeleton sx={{ bgcolor: dark_mode ? "grey.800" : "" }} />
            <Skeleton
              width="60%"
              sx={{ bgcolor: dark_mode ? "grey.800" : "" }}
            />
          </Box>
        </>
      )}
    </>
  );
};

VideoCard.propTypes = {
  video: propTypes.object,
};

export default VideoCard;
