import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsername } from "../tools";
import axios from "axios";

const VITE_GATEWAY_API = import.meta.env.VITE_GATEWAY_API;
const Home = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const username = getUsername();
    if (!username) {
      navigate("/login");
    } else {
      setUsername(username);
    }
  }, []);

  const onLogout = async () => {
    localStorage.removeItem("jwt");
    const response = await axios.post(`${VITE_GATEWAY_API}/users/logout`, {}, { withCredentials: true })
    if(response.status !== 200) {
      alert("Something went wrong");
    } else {
      navigate("/login");
    }
  }
  return (
    <div>
      <h1>Welcome to the app's home page</h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Home;
