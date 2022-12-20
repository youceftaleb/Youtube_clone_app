import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AddVideoModal, AVATAR } from "./";
import { logout } from "../redux/reducers/userReducer";
import { LoginModal } from "./";
import { toggleDarkMode } from "../redux/reducers/appReducer";
import {
  LightMode,
  DarkMode,
  Login,
  VideoCallOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import logo from "/assets/logo192.png";

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
        <Stack direction="row" alignItems="center" gap={2}>
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="logo" height={45} />
          </Link>
          {dark_mode ? (
            <LightMode
              sx={{ color: dark_mode ? "white" : "black", cursor: "pointer" }}
              onClick={() => dispatch(toggleDarkMode())}
            />
          ) : (
            <DarkMode
              sx={{ color: dark_mode ? "white" : "black", cursor: "pointer" }}
              onClick={() => dispatch(toggleDarkMode())}
            />
          )}
        </Stack>
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
            <VideoCallOutlined
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
            <Login
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
