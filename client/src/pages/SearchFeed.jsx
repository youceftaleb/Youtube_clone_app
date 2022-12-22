import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Videos } from "../components";
import { useParams } from "react-router-dom";
import httpCommon from "../utils/http-common";
import { useSelector } from "react-redux";

const SearchFeed = () => {
  const { searchKey } = useParams();
  const [videos, setVideos] = useState([]);
  const { dark_mode } = useSelector((state) => state.app);

  useEffect(() => {
    httpCommon
      .get(`/videos/search?q=${searchKey}`)
      .then((res) => {
        if (res.data.data) {
          const newArr = [
            ...res.data.data[0],
            ...res.data.data[1],
            ...res.data.data[2],
            ...res.data.data[3],
          ];
          const result = newArr.reduce((final, current) => {
            let obj = final.find((item) => item._id === current._id);
            if (obj) {
              return final;
            } else {
              return final.concat([current]);
            }
          }, []);
          setVideos(result);
        } else {
          setVideos([]);
        }
      })
      .catch((err) => console.log(`fetching category error: ${err.message}`));
  }, [searchKey]);
  return (
    <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={2}
        sx={{ color: dark_mode ? "white" : "black" }}
      >
        Search results for:{" "}
        <span style={{ color: "#42a5f5" }}>{searchKey}</span>
      </Typography>
      <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;
