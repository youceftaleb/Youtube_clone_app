import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { Navbar } from "./components";
import Feed from "./pages/Feed";
import ChannelDetailPage from "./pages/ChannelDetailPage";
import VideoDetailPage from "./pages/VideoDetailPage";
import SearchFeed from "./pages/SearchFeed";

const App = () => (
  <BrowserRouter>
    <Box sx={{ backgroundColor: "#000", minHeight: "100vh" }}>
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

export default App;
