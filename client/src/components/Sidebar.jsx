import { Stack } from "@mui/material";
import { categories } from "../utils/constants";
import propTypes from "prop-types";

export const Sidebar = ({
  selectedBtn = "New",
  setSelectedBtn = () => null,
}) => {
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
            backgroundColor: cat.name === selectedBtn && "#fc1503",
            color: "white",
          }}
          key={cat.name}
        >
          <span
            style={{
              color: cat.name === selectedBtn ? "white" : "red",
              marginRight: "15px",
            }}
          >
            {<cat.icon />}
          </span>
          <span style={{ opacity: cat.name === selectedBtn ? 1 : 0.8 }}>
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
