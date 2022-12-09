import { Stack, Box, Typography, TextField, Modal } from "@mui/material";
import { AVATAR } from "./";
import { format } from "timeago.js";
import { useState } from "react";
import { useEffect } from "react";
import httpCommon from "../utils/http-common";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  darkNotification,
  errorNotification,
  successNotification,
} from "../helpers/notifications";
import { deleteOneComment, editComment } from "../redux/reducers/videoSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#000",
  boxShadow: 24,
  p: 4,
  color: "white",
  border: "1px solid white",
};

export const Comment = ({ comment = null }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  const handleEditComment = (e) => {
    e.preventDefault();
    if (!value) return errorNotification("comment is empty");
    httpCommon
      .put(`/comments/${comment._id}`, { text: value })
      .then((res) => {
        dispatch(editComment([comment._id, value]));
        successNotification(res.data.message);
      })
      .catch((err) => errorNotification(err.response.data.message));
    setOpen(false);
    setValue("");
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
            <EditIcon onClick={handleOpen} sx={{ cursor: "pointer" }} />
            <DeleteIcon
              onClick={handleDeleteComment}
              sx={{ cursor: "pointer" }}
            />
          </>
        ) : null}
      </Stack>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={handleEditComment} style={{ width: "100%" }}>
            <TextField
              fullWidth
              focused
              variant="outlined"
              sx={{ input: { color: "white" } }}
              label="Edit your comment"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </form>
        </Box>
      </Modal>
    </>
  );
};
