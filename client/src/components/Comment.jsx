import { Stack, Box, Typography } from "@mui/material";
import { AVATAR, ModifyCommentModal } from "./";
import { format } from "timeago.js";
import { useState } from "react";
import { useEffect } from "react";
import httpCommon from "../utils/http-common";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import propTypes from "prop-types";
import { darkNotification, errorNotification } from "../helpers/notifications";
import { deleteOneComment } from "../redux/reducers/videoReducer";

export const Comment = ({ comment = null }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [channel, setChannel] = useState(null);
  useEffect(() => {
    httpCommon
      .get(`/users/${comment.userId}`)
      .then((res) => setChannel(res.data.data));
  }, [comment.userId]);
  const handleDeleteComment = () => {
    httpCommon
      .delete(`/comments/${comment._id}`)
      .then((res) => {
        dispatch(deleteOneComment(comment._id));
        darkNotification(res.data.message);
      })
      .catch((err) => errorNotification(err.response.data.message));
  };

  return (
    <>
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
        {currentUser?._id === channel?._id ? (
          <>
            <EditIcon
              onClick={() => setOpen(true)}
              sx={{ cursor: "pointer" }}
            />
            <DeleteIcon
              onClick={handleDeleteComment}
              sx={{ cursor: "pointer" }}
            />
          </>
        ) : null}
      </Stack>
      <ModifyCommentModal
        commentId={comment?._id}
        open={open}
        setOpen={setOpen}
        value={value}
        setValue={setValue}
      />
    </>
  );
};

Comment.propTypes = {
  comment: propTypes.object.isRequired,
};
