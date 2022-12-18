import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack, Fab } from "@mui/material";
import { ChannelCard, Videos } from "../components";
import httpCommon from "../utils/http-common";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../helpers/notifications";
import { logout } from "../redux/reducers/userReducer";

function f(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const ChannelDetailPage = () => {
  const { id } = useParams();
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  // delete a user account with all his videos
  const handleDeleteUserAccount = () => {
    httpCommon
      .delete(`/users/${channel._id}`)
      .then((res) => {
        successNotification("Account deleted succefully");
        dispatch(logout());
        location = "/";
      })
      .catch((err) => console.log(err.message));
  };
  // modify user
  const handleModifyUserAccount = () => {};
  // get user
  useEffect(() => {
    httpCommon
      .get(`/users/${id}`)
      .then((res) => setChannel(res.data.data))
      .catch((err) => console.log(err));
    // fetch videos of user
    httpCommon
      .get(`/videos/user/${id}`)
      .then((res) => setVideos(res.data.data))
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background: `linear-gradient(${f(0, 360)}deg, rgba(${f(0, 255)},${f(
              0,
              255
            )},${f(0, 255)},${Math.floor(Math.random() * 10) / 10}), rgba(${f(
              0,
              255
            )},${f(0, 255)},${f(0, 255)},${
              Math.floor(Math.random() * 10) / 10
            }))`,
            zIndex: 10,
            height: "300px",
          }}
        />
        {channel?._id ? (
          <Stack direction="column" alignItems="center">
            <ChannelCard ChannelDetail={channel} marginTop="-120px" />
            {currentUser?._id === channel?._id ? (
              <Box sx={{ mb: 3 }}>
                <Fab
                  onClick={handleDeleteUserAccount}
                  sx={{ mr: 2 }}
                  color="error"
                  variant="extended"
                >
                  <DeleteIcon sx={{ mr: 1 }} />
                  Delete
                </Fab>
                <Fab
                  onClick={handleModifyUserAccount}
                  sx={{ ml: 2 }}
                  variant="extended"
                >
                  <EditIcon sx={{ mr: 1 }} />
                  Modify
                </Fab>
              </Box>
            ) : null}
          </Stack>
        ) : null}
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetailPage;
