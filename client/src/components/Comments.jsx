import { Stack, TextField, Typography } from "@mui/material";
import { AVATAR, Comment } from "./";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import httpCommon from "../utils/http-common";
import propTypes from "prop-types";
import {
  errorNotification,
  successNotification,
} from "../helpers/notifications";
import {
  addComment,
  deleteComments,
  fetchComments,
} from "../redux/reducers/videoReducer";

export const Comments = ({ videoId = "" }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { dark_mode } = useSelector((state) => state.app);
  const { comments } = useSelector((state) => state.video);
  const [value, setValue] = useState("");
  useEffect(() => {
    httpCommon
      .get(`/comments/${videoId}`)
      .then((res) => dispatch(fetchComments(res.data.data)))
      .catch((err) => dispatch(deleteComments()));
  }, [videoId]);
  const handlesubmit = (e) => {
    e.preventDefault();
    if (!value) return errorNotification("comment is empty");
    httpCommon
      .post(`/comments/${videoId}`, { text: value })
      .then((res) => {
        if (res.status === 200) {
          dispatch(addComment(res.data.data));
          successNotification(res.data.message);
        }
      })
      .catch((err) => errorNotification(err.response.data.message));
    setValue("");
  };
  return (
    <Stack sx={{ color: dark_mode ? "#fff" : "black" }} py={5} px={5} gap={5}>
      <Typography>{comments?.length} Comments</Typography>
      {currentUser ? (
        <Stack direction="row" gap={2}>
          <AVATAR user={currentUser} />
          <form onSubmit={handlesubmit} style={{ width: "100%" }}>
            <TextField
              fullWidth
              placeholder="Add a comment..."
              sx={{ input: { color: dark_mode ? "#fff" : "black" } }}
              variant="standard"
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
          </form>
        </Stack>
      ) : null}
      {comments?.map((comment, index) => (
        <Fragment key={index}>
          <Comment comment={comment} />
        </Fragment>
      ))}
    </Stack>
  );
};

Comments.propTypes = {
  selectedBtn: propTypes.string.isRequired,
};
