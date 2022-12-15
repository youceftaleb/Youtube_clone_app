import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { logo } from "../utils/constants";
import LoginIcon from "@mui/icons-material/Login";
import { useState } from "react";
import { useSelector } from "react-redux";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { AVATAR } from "./";
import { LogoutOutlined } from "@mui/icons-material";
import { logout } from "../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { LoginModal } from "./";

export const Navbar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
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
                location.reload();
              }}
            >
              <LogoutOutlined
                sx={{ p: "10px", color: "white", cursor: "pointer" }}
              />
              logout
            </Button>
          </div>
        ) : (
          <Button onClick={() => setOpen(true)} sx={{ color: "white" }}>
            Login
            <LoginIcon sx={{ p: "10px", color: "white", cursor: "pointer" }} />
          </Button>
        )}
      </Stack>
      <LoginModal open={open} setOpen={setOpen} />
    </>
  );
};
