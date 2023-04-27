import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar/Navbar";
import EventViewer from "../components/EventViewer/EventViewer";
import Transactions from "../components/Transactions/Transactions";
import Container from "@mui/material/Container";
import { reLogin } from "../redux/actions";

const AdminHome = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.userData.username);
  const admin = useSelector((state) => state.user.admin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username || !admin) {
      navigate("/login");
    } else {
      dispatch(reLogin());
    }
  }, []);

  return (
    <div>
      <Navbar admin="true"/>
      <Container maxWidth="md">
        <Transactions  admin="true" label="Token ERC20"/>
      </Container>
    </div>
  );
};

export default AdminHome;
