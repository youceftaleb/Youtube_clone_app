import { Stack } from "@mui/material";
import { categories } from "../utils/constants";

export const Sidebar = () => {
  const SelectedCat = "New";
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
          style={{
            backgroundColor: cat.name === SelectedCat && "#fc1503",
            color: "white",
          }}
          key={cat.name}
        >
          <span
            style={{
              color: cat.name === SelectedCat ? "white" : "red",
              marginRight: "15px",
            }}
          >
            {<cat.icon />}
          </span>
          <span style={{ opacity: cat.name === SelectedCat ? 1 : 0.8 }}>
            {cat.name}
          </span>
        </button>
      ))}
    </Stack>
  );
};
