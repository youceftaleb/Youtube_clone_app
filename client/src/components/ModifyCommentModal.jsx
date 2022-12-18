import { Modal, Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  errorNotification,
  successNotification,
} from "../helpers/notifications";
import { editComment } from "../redux/reducers/videoReducer";
import httpCommon from "../utils/http-common";
import propTypes from "prop-types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  p: 4,
};

export const ModifyCommentModal = ({
  commentId = "",
  open = false,
  setOpen = () => location.reload(),
  value = "",
  setValue = () => null,
}) => {
  const { dark_mode } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const handleEditComment = (e) => {
    e.preventDefault();
    if (!value)
      return errorNotification("please edit your comment before submitting");
    httpCommon
      .put(`/comments/${commentId}`, { text: value })
      .then((res) => {
        dispatch(editComment([commentId, value]));
        successNotification(res.data.message);
      })
      .catch((err) => errorNotification(err.response.data.message));
    setOpen(false);
    setValue("");
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          ...style,
          backgroundColor: dark_mode ? "#fff" : "black",
        }}
      >
        <form onSubmit={handleEditComment} style={{ width: "100%" }}>
          <TextField
            fullWidth
            focused
            variant="outlined"
            sx={{ input: { color: dark_mode ? "black" : "white" } }}
            label="Edit your comment"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      </Box>
    </Modal>
  );
};

ModifyCommentModal.propTypes = {
  commentId: propTypes.string.isRequired,
  open: propTypes.bool.isRequired,
  setOpen: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
  setValue: propTypes.func.isRequired,
};
