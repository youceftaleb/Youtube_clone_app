import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { Navbar } from "./components";
import { useSelector } from "react-redux";
import { Feed, SearchFeed, VideoDetailPage, ChannelDetailPage } from "./pages";

const App = () => {
  const { dark_mode } = useSelector((state) => state.app);
  return (
    <BrowserRouter>
      <Box
        sx={{
          backgroundColor: dark_mode ? "#0f0f0f" : "#fff",
          minHeight: "100vh",
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetailPage />} />
          <Route path="/channel/:id" element={<ChannelDetailPage />} />
          <Route path="/search/:searchKey" element={<SearchFeed />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};

export default App;
