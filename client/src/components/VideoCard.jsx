import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import propTypes from "prop-types";
import { format } from "timeago.js";
import { useEffect } from "react";
import http from "../utils/http-common";
import { useState } from "react";

export const VideoCard = ({ video }) => {
  const [channel, setChannel] = useState({});
  useEffect(() => {
    http.get(`/users/${video.userId}`).then((res) => {
      setChannel(res.data.data);
    });
  }, [video.userId]);
  return (
    <Card
      sx={{
        width: { xs: "100%", sm: "358px", md: "320px" },
        boxShadow: "none",
        borderRadius: 0,
      }}
    >
      <Link to={`/video/${video._id}`}>
        <CardMedia
          image={video?.thumbnailUrl}
          alt={video?.title}
          sx={{ width: { xs: "100%", sm: "358px", md: "320px" }, height: 180 }}
        />
      </Link>
      <CardContent sx={{ backgroundColor: "#1e1e1e", height: "106px" }}>
        <Link to={`/video/${video._id}`}>
          <Typography variant="subtitle1" fontWeight="bold" color="#fff">
            {video?.title.slice(0, 60)}
          </Typography>
          <Typography sx={{ fontSize: 12, opacity: 0.7 }} color="#fff">
            {video?.views} views • {format(video?.createdAt)}
          </Typography>
        </Link>
        {/* // !channel card */}
        <Link to={`/channel/${channel._id}`}>
          <Typography variant="subtitle2" fontWeight="bold" color="gray">
            {channel?.userName}
            <CheckCircle sx={{ fontSize: 12, color: "gray", ml: "5px" }} />
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
