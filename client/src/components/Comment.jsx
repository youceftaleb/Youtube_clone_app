import { Stack, Box, Typography } from "@mui/material";
import { AVATAR, ModifyCommentModal } from "./";
import { format } from "timeago.js";
import { useState, useEffect } from "react";
import httpCommon from "../utils/http-common";
import { useDispatch, useSelector } from "react-redux";
import propTypes from "prop-types";
import { deleteCommentServer } from "../services/comments";
import { Delete, Edit } from "@mui/icons-material";

export const Comment = ({ comment = null }) => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { dark_mode } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const [channel, setChannel] = useState(null);
  useEffect(() => {
    httpCommon
      .get(`/users/${comment.userId}`)
      .then((res) => setChannel(res.data.data));
  }, [comment.userId]);

  return (
    <>
      <Stack direction="row">
        <AVATAR user={channel} />
        <Box px={2}>
          <Stack color={dark_mode ? "#fff" : "black"} direction="row">
            <Typography sx={{ fontSize: "14px", sm: "subtitle2", md: "h6" }}>
              {channel?.userName}
            </Typography>
            <Typography sx={{ fontSize: "11px", opacity: 0.7, ml: 1 }}>
              {format(comment?.createdAt)}
            </Typography>
          </Stack>
          <Typography
            sx={{ sm: "subtitle2", md: "body2", opacity: 0.7 }}
            color={dark_mode ? "#fff" : "black"}
          >
            {comment?.text}
          </Typography>
        </Box>
        {currentUser?._id === channel?._id ? (
          <>
            <Edit
              className="action-icon"
              onClick={() => setOpen(true)}
              sx={{ cursor: "pointer", opacity: 0.3 }}
            />
            <Delete
              className="action-icon"
              onClick={() => deleteCommentServer(dispatch, comment._id)}
              sx={{ cursor: "pointer", opacity: 0.3 }}
            />
          </>
        ) : null}
      </Stack>
      <ModifyCommentModal
        commentId={comment?._id}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

Comment.propTypes = {
  comment: propTypes.object.isRequired,
};
