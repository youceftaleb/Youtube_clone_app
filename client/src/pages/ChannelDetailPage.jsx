import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { ChannelCard, Videos } from "../components";
import httpCommon from "../utils/http-common";

function f(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const ChannelDetailPage = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    httpCommon
      .get(`/users/${id}`)
      .then((res) => setChannel(res.data.data))
      .catch((err) => console.log(err));
    httpCommon
      .get(`/videos/user/${id}`)
      .then((res) => setVideos(res.data.data))
      .catch((err) => console.log(err));
  }, [id]);
  console.log(channel);
  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background: `linear-gradient(${f(0, 360)}deg, rgba(${f(0, 255)},${f(
              0,
              255
            )},${f(0, 255)},${Math.floor(Math.random() * 10) / 10}), rgba(${f(
              0,
              255
            )},${f(0, 255)},${f(0, 255)},${
              Math.floor(Math.random() * 10) / 10
            }))`,
            zIndex: 10,
            height: "300px",
          }}
        />
        {channel?._id ? (
          <ChannelCard ChannelDetail={channel} marginTop="-120px" />
        ) : null}
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetailPage;
