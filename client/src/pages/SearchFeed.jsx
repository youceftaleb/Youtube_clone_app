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
          const newArr = [
            ...res.data[0],
            ...res.data[1],
            ...res.data[2],
            ...res.data[3],
          ];
          const result = newArr.reduce((final, current) => {
            let obj = final.find((item) => item._id === current._id);
            if (obj) {
              return final;
            } else {
              return final.concat([current]);
            }
          }, []);
          // console.table(newArr);
          // console.log(result);
          setVideos(result);
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
        <span style={{ color: "#42a5f5" }}>{searchKey}</span>
      </Typography>
      <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;
