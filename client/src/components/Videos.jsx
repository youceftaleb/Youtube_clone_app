import { Stack, Box } from "@mui/material";
import propTypes from "prop-types";
import { ChannelCard, VideoCard } from "./";

export const Videos = ({ videos = null, direction = "" }) => {
  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent="start"
      gap={2}
    >
      {videos.map((item, index) => (
        <Box key={index}>
          {item.title && <VideoCard video={item} />}
          {item.email && <ChannelCard ChannelDetail={item} />}
        </Box>
      ))}
    </Stack>
  );
};

Videos.propTypes = {
  videos: propTypes.array.isRequired,
  direction: propTypes.string,
};
