import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack, Fab } from "@mui/material";
import {
  ChannelCard,
  Videos,
  ModifyUserNameModal,
  ModifyProfilePicModal,
} from "../components";
import { Edit, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchChannelAndItsVideos } from "../services/users";

function f(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const ChannelDetailPage = () => {
  const { id } = useParams();
  const [openModifyUserNameModal, setOpenModifyUserNameModal] = useState(false);
  const [openModifyProfilePicModal, setOpenModifyProfilePicModal] =
    useState(false);
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  // get user
  useEffect(() => {
    fetchChannelAndItsVideos(id, setChannel, setVideos);
  }, [id]);
  return (
    <>
      <Box minHeight="95vh">
        <Box>
          <div
            style={{
              background: `linear-gradient(${f(0, 360)}deg, rgba(${f(
                0,
                255
              )},${f(0, 255)},${f(0, 255)},${
                Math.floor(Math.random() * 10) / 10
              }), rgba(${f(0, 255)},${f(0, 255)},${f(0, 255)},${
                Math.floor(Math.random() * 10) / 10
              }))`,
              zIndex: 10,
              height: "300px",
            }}
          />
          {channel?._id ? (
            <Stack direction="column" alignItems="center">
              <div
                onClick={() => {
                  currentUser?._id === channel?._id
                    ? setOpenModifyProfilePicModal(true)
                    : null;
                }}
              >
                <ChannelCard ChannelDetail={channel} marginTop="-120px" />
              </div>
              {currentUser?._id === channel?._id ? (
                <Box sx={{ mb: 3 }}>
                  <Fab
                    onClick={() => deleteUser(dispatch, channel)}
                    sx={{ mr: 2 }}
                    color="error"
                    variant="extended"
                  >
                    <Delete sx={{ mr: 1 }} />
                    Delete
                  </Fab>
                  <Fab
                    onClick={() => setOpenModifyUserNameModal(true)}
                    sx={{ ml: 2 }}
                    variant="extended"
                  >
                    <Edit sx={{ mr: 1 }} />
                    Modify name
                  </Fab>
                </Box>
              ) : null}
            </Stack>
          ) : null}
        </Box>
        <Box display="flex" p="2">
          <Box sx={{ mr: { xs: "20px", sm: "30px", md: "100px" } }} />
          <Videos videos={videos} />
        </Box>
      </Box>
      <ModifyUserNameModal
        open={openModifyUserNameModal}
        setOpen={setOpenModifyUserNameModal}
        userId={channel?._id}
      />
      <ModifyProfilePicModal
        open={openModifyProfilePicModal}
        setOpen={setOpenModifyProfilePicModal}
        user={channel}
      />
    </>
  );
};

export default ChannelDetailPage;
