import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
export default function Appbar({ loggedInUser, setLoggedInUser }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    setLoggedInUser("");
    navigate("/");
    sessionStorage.clear();
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            LOGO
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <NavLink to={"/dashboard"}>
              <Button sx={{ color: "#fff" }}>DashBoard</Button>
            </NavLink>
            {loggedInUser?.isAdmin === true && (
              <NavLink to={"/dashboard/user"}>
                <Button sx={{ color: "#fff" }}>User</Button>
              </NavLink>
            )}
            <Button onClick={handleLogout} sx={{ color: "#fff" }}>
              LogOut
              <LogoutIcon />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
