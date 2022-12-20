import { useSelector } from "react-redux";
import {
  Modal,
  Box,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import propTypes from "prop-types";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import AddImage from "@mui/icons-material/AddPhotoAlternate";
import { modifyProfilePic, upload } from "../services/fileStorage";
import { useState, useEffect } from "react";

export const ModifyProfilePicModal = ({
  user = null,
  open = false,
  setOpen = () => location.reload(),
}) => {
  const [profilePic, setProfilePic] = useState(null);
  const [picLoading, setPicLoading] = useState(0);
  const [picUploadSuccess, setPicUploadSuccess] = useState(0);
  const { dark_mode } = useSelector((state) => state.app);
  //! ==================================Edit profile picture================================================ !//
  const func = () => {
    modifyProfilePic(user, picUploadSuccess);
  };
  useEffect(() => {
    profilePic ? upload(profilePic, setPicLoading, setPicUploadSuccess) : null;
  }, [profilePic]);
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
          backgroundColor: dark_mode ? "black" : "white",
        }}
      >
        {picLoading < 100 ? (
          picLoading > 0 ? (
            <CircularProgress value={picLoading} />
          ) : (
            <>
              <Typography
                component="label"
                htmlFor="thumbnail"
                sx={{
                  color: "white",
                  height: 60,
                  width: 250,
                  bgcolor: "#42a5f5",
                  margin: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <AddImage sx={{ color: "white" }} />
                &nbsp; Choose a photo
              </Typography>
              <input
                type="file"
                accept="image/*"
                id="thumbnail"
                name="thumbnail"
                style={{ display: "none" }}
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </>
          )
        ) : (
          <Typography sx={{ color: dark_mode ? "white" : "black" }}>
            <CloudDoneIcon />
            &nbsp; uploaded successfully
          </Typography>
        )}
        <Button onClick={func} variant="outlined">
          add
        </Button>
      </Box>
    </Modal>
  );
};

ModifyProfilePicModal.propTypes = {
  user: propTypes.object.isRequired,
  open: propTypes.bool.isRequired,
  setOpen: propTypes.func.isRequired,
};
