import { useState } from "react";
import { Box, Modal } from "@mui/material";
import { SignInPage, SignUpPage } from ".";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LoginIcon from "@mui/icons-material/Login";
import propTypes from "prop-types";

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
};

export const LoginModal = ({
  open = false,
  setOpen = () => location.reload(),
}) => {
  const [value, setValue] = useState(0);
  const [login, setLogin] = useState(true);
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <Box sx={style}>
          {login ? <SignInPage /> : <SignUpPage />}
          <BottomNavigation
            sx={{ bgcolor: "black" }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              sx={{ color: "white" }}
              label="Sign in"
              onClick={() => setLogin(true)}
              icon={<LoginIcon />}
            />
            <BottomNavigationAction
              sx={{ color: "white" }}
              label="Sign up"
              onClick={() => setLogin(false)}
              icon={<LockOpenIcon />}
            />
          </BottomNavigation>
        </Box>
      </>
    </Modal>
  );
};

LoginModal.propTypes = {
  open: propTypes.bool.isRequired,
  setOpen: propTypes.func.isRequired,
};
