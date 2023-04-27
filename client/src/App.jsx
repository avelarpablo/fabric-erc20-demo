import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import AdminHome from "./pages/AdminHome";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adminhome" element={<AdminHome />} />
      <Route path="/login" element={<Login type="false" />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin" element={<Login type="true" />}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

export default App
