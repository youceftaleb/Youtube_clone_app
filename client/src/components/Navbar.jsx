import { Button, Stack, Box, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { logo } from "../utils/constants";
import LoginIcon from "@mui/icons-material/Login";
import { SignInPage, SignUpPage } from "./";
import { useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useSelector } from "react-redux";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { AVATAR } from "./";
import { LogoutOutlined } from "@mui/icons-material";
import { logout } from "../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

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

export const Navbar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [login, setLogin] = useState(true);
  const [value, setValue] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <Stack
        zIndex={10}
        direction="row"
        alignItems="center"
        p={2}
        sx={{
          position: "sticky",
          background: "#000",
          top: 0,
          justifyContent: "space-between",
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="logo" height={45} />
        </Link>
        <SearchBar />
        {currentUser ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: "500",
              color: "white",
            }}
          >
            <VideoCallOutlinedIcon sx={{ color: "white", cursor: "pointer" }} />
            <AVATAR user={currentUser} />
            <Button
              sx={{ color: "white" }}
              onClick={() => {
                dispatch(logout());
                localStorage.removeItem("token");
                window.location = pathname;
              }}
            >
              <LogoutOutlined
                sx={{ p: "10px", color: "white", cursor: "pointer" }}
              />
              logout
            </Button>
          </div>
        ) : (
          <Button onClick={handleOpen} sx={{ color: "white" }}>
            Login
            <LoginIcon sx={{ p: "10px", color: "white", cursor: "pointer" }} />
          </Button>
        )}
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
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
    </>
  );
};
