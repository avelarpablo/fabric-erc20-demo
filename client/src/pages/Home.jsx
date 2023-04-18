import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsername } from "../tools";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";
import EventViewer from "../components/EventViewer/EventViewer";
import Transactions from "../components/Transactions/Transactions";
import Container from "@mui/material/Container";
import { VITE_GATEWAY_CLIENT_API } from "../tools";

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
    const response = await axios.post(
      `${VITE_GATEWAY_CLIENT_API}/users/logout`,
      {},
      { withCredentials: true }
    );
    if (response.status !== 200) {
      alert("Something went wrong");
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Navbar />
      <Container maxWidth="md">
        <Transactions />
        <EventViewer />
      </Container>
    </div>
  );
};

export default Home;
