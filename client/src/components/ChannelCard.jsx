import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { demoProfilePicture } from "../utils/constants";

export const ChannelCard = ({ ChannelDetail }) => {
  console.log(ChannelDetail);
  return (
    <Box
      sx={{
        boxShadow: "none",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "356px", md: "320px" },
        height: "326px",
        margin: "auto",
      }}
    >
      <Link to={`/channel/${ChannelDetail._id}`}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <CardMedia
            image={ChannelDetail?.profilePic || demoProfilePicture}
            alt={ChannelDetail?.userName}
            sx={{
              borderRadius: "50%",
              height: "180px",
              width: "180px",
              mb: 2,
              border: "1px solid #e3e3e3",
            }}
          />
          <Typography variant="h6">
            {ChannelDetail?.userName}
            <CheckCircle sx={{ fontSize: 12, color: "gray", ml: "5px" }} />
          </Typography>
          {ChannelDetail?.subNumber && (
            <Typography>
              {parseInt(ChannelDetail?.subNumber).toLocaleString()} Subscibers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
};
