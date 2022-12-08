import { Stack, TextField, Typography } from "@mui/material";
import { AVATAR, Comment } from "./";
import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import httpCommon from "../utils/http-common";

export const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    httpCommon.get(`/comments/${videoId}`).then((res) => {
      if (res.status === 200) {
        setComments(res.data.data);
      }
    });
  }, [videoId]);
  return (
    <Stack sx={{ color: "#fff" }} py={5} px={5} gap={5}>
      <Typography>{comments?.length} Comments</Typography>
      <Stack direction="row" gap={2}>
        <AVATAR user={currentUser} />
        <TextField
          fullWidth
          placeholder="Add a comment..."
          sx={{ input: { color: "white" } }}
          variant="standard"
        />
      </Stack>
      {comments?.map((comment, index) => (
        <Fragment key={index}>
          <Comment comment={comment} />
        </Fragment>
      ))}
    </Stack>
  );
};
