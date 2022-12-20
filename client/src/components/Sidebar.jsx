import { Stack } from "@mui/material";
import { categories } from "../utils/categories";
import propTypes from "prop-types";
import { useSelector } from "react-redux";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  cursor: "pointer",
  border: "none",
  padding: "7px 15px",
  margin: "10px 0px",
  borderRadius: " 20px",
  transition: "all 0.3s ease",
};

export const Sidebar = ({
  selectedBtn = "Home",
  setSelectedBtn = () => null,
}) => {
  const { dark_mode } = useSelector((state) => state.app);
  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "95%" },
        flexDirection: { md: "column" },
      }}
    >
      {categories.map((cat) => (
        <button
          className="category-btn"
          onClick={() => setSelectedBtn(cat.name)}
          style={{
            backgroundColor:
              cat.name === selectedBtn
                ? dark_mode
                  ? "white"
                  : "#0f0f0f"
                : dark_mode
                ? "#0f0f0f"
                : "white",
            color: dark_mode ? "white" : "black",
            ...style,
          }}
          key={cat.name}
        >
          <span
            style={{
              color: dark_mode ? "white" : "black",
              marginRight: "15px",
            }}
          >
            {cat.name === selectedBtn ? (
              <cat.icon sx={{ color: dark_mode ? "black" : "white" }} />
            ) : (
              <cat.outlined_icon
                sx={{ color: dark_mode ? "white" : "black" }}
              />
            )}
          </span>
          <span
            style={{
              opacity: cat.name === selectedBtn ? 1 : 0.8,
              color:
                cat.name === selectedBtn
                  ? dark_mode
                    ? "black"
                    : "white"
                  : dark_mode
                  ? "white"
                  : "black",
            }}
          >
            {cat.name}
          </span>
        </button>
      ))}
    </Stack>
  );
};

Sidebar.propTypes = {
  selectedBtn: propTypes.string.isRequired,
  setSelectedBtn: propTypes.func.isRequired,
};
