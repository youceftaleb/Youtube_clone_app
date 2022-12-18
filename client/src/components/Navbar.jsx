import { Button, Stack,Box } from "@mui/material";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { logo } from "../utils/constants";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { AddVideoModal, AVATAR } from "./";
import { LogoutOutlined } from "@mui/icons-material";
import { logout } from "../redux/reducers/userReducer";
import { LoginModal } from "./";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { toggleDarkMode } from "../redux/reducers/appReducer";

export const Navbar = () => {
  const dispatch = useDispatch();
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openAddVideoModal, setOpenAddVideoModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { dark_mode } = useSelector((state) => state.app);
  return (
    <>
      <Stack
        zIndex={10}
        direction="row"
        alignItems="center"
        p={2}
        sx={{
          position: "sticky",
          background: dark_mode ? "rgb(15,15,15)" : "#fff",
          top: 0,
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="logo" height={45} />
          </Link>
          {dark_mode ? (
            <LightModeIcon
              sx={{ color: dark_mode ? "white" : "black", cursor: "pointer" }}
              onClick={() => dispatch(toggleDarkMode())}
            />
          ) : (
            <DarkModeIcon
              sx={{ color: dark_mode ? "white" : "black", cursor: "pointer" }}
              onClick={() => dispatch(toggleDarkMode())}
            />
          )}
        </Box>
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
            <VideoCallOutlinedIcon
              onClick={() => setOpenAddVideoModal(true)}
              sx={{ color: dark_mode ? "white" : "black", cursor: "pointer" }}
            />
            <AVATAR user={currentUser} />
            <Button
              sx={{ color: dark_mode ? "white" : "black" }}
              onClick={() => {
                dispatch(logout());
                localStorage.removeItem("token");
                location.reload();
              }}
            >
              <LogoutOutlined
                sx={{
                  p: "10px",
                  color: dark_mode ? "white" : "black",
                  cursor: "pointer",
                }}
              />
              logout
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setOpenLoginModal(true)}
            sx={{ color: dark_mode ? "white" : "black" }}
          >
            Login
            <LoginIcon
              sx={{
                p: "10px",
                color: dark_mode ? "white" : "black",
                cursor: "pointer",
              }}
            />
          </Button>
        )}
      </Stack>
      <LoginModal open={openLoginModal} setOpen={setOpenLoginModal} />
      <AddVideoModal open={openAddVideoModal} setOpen={setOpenAddVideoModal} />
    </>
  );
};
