import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import propTypes from "prop-types";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import http from "../utils/http-common";
import { useSelector } from "react-redux";

export const VideoCard = ({ video }) => {
  const [channel, setChannel] = useState(null);
  const { dark_mode } = useSelector((state) => state.app);
  useEffect(() => {
    http.get(`/users/${video.userId}`).then((res) => {
      setChannel(res.data.data);
    });
  }, [video.userId]);
  return (
    <Card
      sx={{
        width: { xs: "100%", md: "300px" },
        boxShadow: "none",
        borderRadius: 0,
        background: "transparent",
      }}
    >
      <Link to={`/video/${video._id}`}>
        <CardMedia
          image={video?.thumbnailUrl}
          alt={video?.title}
          sx={{
            width: { xs: "100%", md: "300px" },
            height: 180,
            borderRadius: 5,
          }}
        />
      </Link>
      <CardContent sx={{ backgroundColor: "transparent", height: "80px" }}>
        <Link to={`/video/${video._id}`}>
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
            {video?.views} views • {format(video?.createdAt)}
          </Typography>
        </Link>
        {/* // !channel card */}
        <Link to={`/channel/${channel?._id}`}>
          <Typography variant="subtitle2" fontWeight="bold" color="gray">
            {channel?.userName}
            {channel?.subNumber > 1000 ? (
              <CheckCircle sx={{ fontSize: 12, color: "gray", ml: "5px" }} />
            ) : null}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

VideoCard.propTypes = {
  video: propTypes.object,
};

export default VideoCard;
