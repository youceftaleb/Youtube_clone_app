import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Sidebar, Videos } from "../components";
import { useSelector } from "react-redux";

const Feed = () => {
  const { dark_mode } = useSelector((state) => state.app);
  const [selectedBtn, setSelectedBtn] = useState("New");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9001/api/videos/category?category=${selectedBtn}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setVideos(res.data);
        } else {
          setVideos([]);
        }
      })
      .catch((err) => {
        console.log(`fetching category error: ${err.message}`);
      });
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
