import {
  Box,
  Modal,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { useState } from "react";
import propTypes from "prop-types";
import { useSelector } from "react-redux";
import { SignInPage, SignUpPage } from "./";
import { Login, LockOpen } from "@mui/icons-material";

export const LoginModal = ({
  open = false,
  setOpen = () => location.reload(),
}) => {
  const { dark_mode } = useSelector((state) => state.app);
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
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            boxShadow: 24,
            p: 4,
            color: "white",
            backgroundColor: dark_mode ? "black" : "white",
          }}
        >
          {login ? <SignInPage /> : <SignUpPage />}
          <BottomNavigation
            sx={{ bgcolor: dark_mode ? "black" : "white" }}
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              sx={{ color: dark_mode ? "white" : "black" }}
              label="Sign in"
              onClick={() => setLogin(true)}
              icon={<Login />}
            />
            <BottomNavigationAction
              sx={{ color: dark_mode ? "white" : "black" }}
              label="Sign up"
              onClick={() => setLogin(false)}
              icon={<LockOpen />}
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
