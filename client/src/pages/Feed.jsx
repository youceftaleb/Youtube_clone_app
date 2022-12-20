import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Sidebar, Videos } from "../components";
import { useSelector } from "react-redux";
import httpCommon from "../utils/http-common";
import { errorNotification } from "../helpers/notifications";

const Feed = () => {
  const { dark_mode } = useSelector((state) => state.app);
  const { currentUser } = useSelector((state) => state.user);
  const [selectedBtn, setSelectedBtn] = useState("Home");
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    if (selectedBtn === "Home") {
      httpCommon
        .get("/videos/random")
        .then((res) => {
          if (res.data.data) {
            setVideos(res.data.data);
          } else {
            setVideos([]);
          }
        })
        .catch((err) => console.log(`fetching category error: ${err.message}`));
    } else if (selectedBtn === "Trending") {
      httpCommon
        .get("/videos/trend")
        .then((res) => {
          if (res.data.data) {
            setVideos(res.data.data);
          } else {
            setVideos([]);
          }
        })
        .catch((err) => console.log(`fetching category error: ${err.message}`));
    } else if (selectedBtn === "Subscriptions") {
      if (currentUser) {
        httpCommon.get("/videos/subs").then((res) => {
          if (res.data.data) {
            setVideos(res.data.data);
          } else {
            setVideos([]);
          }
        });
      } else {
        errorNotification("you are not logged in");
        setVideos([]);
      }
    } else {
      httpCommon
        .get(`/videos/category?category=${selectedBtn}`)
        .then((res) => {
          if (res.data.data) {
            setVideos(res.data.data);
          } else {
            setVideos([]);
          }
        })
        .catch((err) => console.log(`fetching category error: ${err.message}`));
    }
  }, [selectedBtn]);
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar selectedBtn={selectedBtn} setSelectedBtn={setSelectedBtn} />
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: dark_mode ? "white" : "black" }}
        >
          {selectedBtn} <span style={{ color: "#42a5f5" }}>videos</span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
