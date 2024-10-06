import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Posts from "./components/Posts";
import SingleNews from "./components/SingleNews";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/posts/:id" element={<SingleNews />} />
      </Routes>
    </Router>
  );
}

export default App;
