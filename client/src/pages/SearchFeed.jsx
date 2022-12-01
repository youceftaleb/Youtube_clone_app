import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Videos } from "../components";
import { useParams } from "react-router-dom";

const SearchFeed = () => {
  const { searchKey } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9001/api/videos/search?q=${searchKey}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.data) {
          setVideos([
            ...res.data[0],
            ...res.data[1],
            ...res.data[2],
            ...res.data[3],
          ]);
          console.log([
            ...res.data[0],
            ...res.data[1],
            ...res.data[2],
            ...res.data[3],
          ]);
          console.log([
            ...new Set([
              ...res.data[0],
              ...res.data[1],
              ...res.data[2],
              ...res.data[3],
            ]),
          ]);
        } else {
          setVideos([]);
        }
      })
      .catch((err) => {
        console.log(`fetching category error: ${err.message}`);
      });
  }, [searchKey]);
  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Search results for:{" "}
        <span style={{ color: "#fc1503" }}>{searchKey}</span>
      </Typography>
      <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;
