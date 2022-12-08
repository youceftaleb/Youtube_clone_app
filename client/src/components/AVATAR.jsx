import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const AVATAR = ({ user }) => {
  return (
    <Link to={`/channel/${user?._id}`}>
      <Avatar
        src={user?.profilePic}
        alt={user?.userName}
        sx={{ width: 45, height: 45, bgcolor: getRandomColor() }}
      />
    </Link>
  );
};
