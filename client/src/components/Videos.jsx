import { Stack, Box } from "@mui/material";
import propTypes from "prop-types";
import { ChannelCard, VideoCard } from "./";

export const Videos = ({ videos }) => {
  return (
    <Stack direction="row" flexWrap="wrap" justifyContent="start" gap={2}>
      {videos.map((video, index) => (
        <Box key={index}>
          {video.title && <VideoCard video={video} />}
          {/* {video.title && <ChannelCard ChannelDetail={video} />} */}
        </Box>
      ))}
    </Stack>
  );
};

Videos.propTypes = {
  videos: propTypes.array.isRequired,
};
