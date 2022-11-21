import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { Feed, Navbar, SearchFeed } from "./components";
import ChannelDetailPage from "./pages/ChannelDetailPage";
import VideoDetailPage from "./pages/VideoDetailPage";

const App = () => (
  <BrowserRouter>
    <Box sx={{ backgroundColor: "#000", minHeight: "100vh" }}>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Feed />} />
        <Route path="/video/:id" element={<VideoDetailPage />} />
        <Route path="/channel/:id" element={<ChannelDetailPage />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
      </Routes>
    </Box>
  </BrowserRouter>
);

export default App;
