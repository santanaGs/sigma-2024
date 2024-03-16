import Login from "@/screens/Login";
import Main from "@/screens/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Main />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
