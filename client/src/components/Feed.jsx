import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Sidebar, Videos } from "../components";
import useFetch from "../hooks/useFetch";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");

  const { res, error, loading } = useFetch(
    `/videos/category?category=${selectedCategory}`,
    selectedCategory
  );
  useEffect(() => console.log(res), [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright 2022 Youcef
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#fc1503" }}>videos</span>
        </Typography>
        <Videos videos={[]} />
      </Box>
    </Stack>
  );
};

export default Feed;
