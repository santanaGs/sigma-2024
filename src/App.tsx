import Login from "@/screens/Login";
import Main from "@/screens/Main";
import Agenda from "@/screens/Agenda";
import Suporte from "@/screens/Suporte";
import Prontuario from "@/screens/Prontuario";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Main />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/suporte" element={<Suporte />} />
          <Route path="/prontuario" element={<Prontuario />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
