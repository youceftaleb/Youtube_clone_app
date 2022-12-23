import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Box, TextField } from "@mui/material";
import propTypes from "prop-types";
import { modifyUserName } from "../services/users";

export const ModifyUserNameModal = ({
  userId = "",
  open = false,
  setOpen = () => location.reload(),
}) => {
  const { dark_mode } = useSelector((state) => state.app);
  const [value, setValue] = useState();
  const dispatch = useDispatch();
  const handleEditUserName = (e) => {
    e.preventDefault();
    modifyUserName(dispatch, userId, value, setOpen);
    setValue("");
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          boxShadow: 24,
          p: 4,
          backgroundColor: dark_mode ? "#fff" : "black",
        }}
      >
        <form onSubmit={handleEditUserName} style={{ width: "100%" }}>
          <TextField
            fullWidth
            focused
            variant="outlined"
            sx={{ input: { color: dark_mode ? "black" : "white" } }}
            label="Edit your name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      </Box>
    </Modal>
  );
};

ModifyUserNameModal.propTypes = {
  userId: propTypes.string.isRequired,
  open: propTypes.bool.isRequired,
  setOpen: propTypes.func.isRequired,
};
