import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { useSelector } from "react-redux";

export const ChannelCard = ({
  ChannelDetail = {
    _id: "",
    profilePic: "http://dergipark.org.tr/assets/app/images/buddy_sample.png",
    userName: "S",
    subNumber: null,
  },
  marginTop = "",
}) => {
  const { dark_mode } = useSelector((state) => state.app);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "356px", md: "320px" },
        height: "326px",
        margin: "auto",
        marginTop,
      }}
    >
      <Link to={`/channel/${ChannelDetail._id}`}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            color: dark_mode ? "#fff" : "black",
          }}
        >
          <CardMedia
            image={ChannelDetail?.profilePic}
            alt={ChannelDetail?.userName}
            sx={{
              borderRadius: "50%",
              height: "180px",
              width: "180px",
              mb: 2,
              border: `1px solid ${dark_mode ? "white" : "#e3e3e3"}`,
            }}
          />
          <Typography variant="h6">
            {ChannelDetail?.userName}
            {ChannelDetail.subNumber >= 1000 ? (
              <CheckCircle sx={{ fontSize: 12, color: "gray", ml: "5px" }} />
            ) : null}
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

ChannelCard.propTypes = {
  ChannelDetail: propTypes.object,
  marginTop: propTypes.string,
};
