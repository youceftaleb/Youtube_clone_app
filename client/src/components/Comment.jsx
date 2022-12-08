import { Stack, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { AVATAR } from "./";
import { format } from "timeago.js";
import { useState } from "react";
import { useEffect } from "react";
import httpCommon from "../utils/http-common";

export const Comment = ({ comment = null }) => {
  const [channel, setChannel] = useState(null);
  useEffect(() => {
    httpCommon
      .get(`/users/${comment.userId}`)
      .then((res) => setChannel(res.data.data));
  }, [comment.userId]);
  return (
    <Link to="/">
      <Stack direction="row">
        <AVATAR user={channel} />
        <Box px={2}>
          <Stack color="#fff" direction="row">
            <Typography sx={{ fontSize: "14px", sm: "subtitle2", md: "h6" }}>
              {channel?.userName}
            </Typography>
            <Typography sx={{ fontSize: "11px", opacity: 0.7, ml: 1 }}>
              {format(comment?.createdAt)}
            </Typography>
          </Stack>
          <Typography
            sx={{ sm: "subtitle2", md: "body2", opacity: 0.7 }}
            color="#fff"
          >
            {comment?.text}
          </Typography>
        </Box>
      </Stack>
    </Link>
  );
};
