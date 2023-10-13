import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import { Box, CssBaseline, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import axios from "axios";

const Dashboard = ({ setLoggedInUser, loggedInUser }) => {
  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  // loggedin user
  useEffect(() => {
    const user = parseJwt(sessionStorage.Newtoken);
    setLoggedInUser(user?.data);
  }, []);

  return (
    <Box>
      <Appbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <CssBaseline />
      <Toolbar />

      <Outlet />
    </Box>
  );
};

export default Dashboard;
