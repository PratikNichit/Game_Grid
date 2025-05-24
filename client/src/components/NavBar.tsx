import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [distAnchorEl, setDistAnchorEl] = React.useState<null | HTMLElement>(
    null
  );

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDistMenu = (event: React.MouseEvent<HTMLElement>) => {
    setDistAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDistAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#111", px: 2 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={handleMenu}
          >
            <img src="/plainLogo.png" alt="logo" style={{ height: 60 }} />
          </Box>

          <Typography sx={{ fontWeight: "bold" }}>STORE</Typography>
          <Typography>Support</Typography>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>T</Avatar>
            <Typography>theragnarokgamer</Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#1e9fff", textTransform: "none" }}
          >
            Libary
          </Button>
        </Box>

        {/* Menus */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Epic Games</MenuItem>
        </Menu>
        <Menu
          anchorEl={distAnchorEl}
          open={Boolean(distAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>For Developers</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
