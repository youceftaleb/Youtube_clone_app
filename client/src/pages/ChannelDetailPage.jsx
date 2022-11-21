import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { Videos, ChannelCard } from "../components";
import http from "../utils/http-common";

const ChannelDetailPage = () => {
  const { id } = useParams();
  // const [channelDetail, setChannelDetail] = useState(null);
  // console.log(channelDetail);
  // useEffect(() => {
  // http.get(`/users/${id}`).then((res) => setChannelDetail(res.data.data));
  // http.get(`/users/${id}`).then((res) => setChannelDetail(res.data.data));
  // }, [id]);
  return <Box style={{ color: "red" }}>{id}</Box>;
};

export default ChannelDetailPage;
