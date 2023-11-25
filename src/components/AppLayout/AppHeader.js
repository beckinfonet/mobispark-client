import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles.css";

// const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Dashboard", "Bookings", "Logout"];

export function AppHeader(props) {
  const { authStatus, user } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const vendorId = "64292a77a3166bcd75d4e16f";

  const handlemenuItemClick = (selection) => {
    if (selection === "Dashboard") {
      navigate(`/vendor-dashboard/${user?.data?.[0]?._id}`);
    }

    if (selection === "Profile") {
      navigate("/profile");
    }

    if (selection === "Bookings") {
      navigate("/bookings");
    }

    if (selection === "Logout") {
      setAnchorElUser(null);
      navigate("/");
      props.signOut();
    }
  };

  const handleLoginOnClick = () => {
    navigate("/login", { state: { from: location } });
  };

  return (
    <AppBar component="nav">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex", lg: "flex" },
              flexGrow: 1,
              fontWeight: 700,
              fontFamily: "inherit",
              letterSpacing: "none",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              className="brightness-img"
              src="/logo-glow.png"
              alt="logo"
              height="80"
              width="80"
            />
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "inherit",
              fontWeight: 700,
              letterSpacing: "none",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              className="brightness-img"
              src="/logo-glow.png"
              alt="logo"
              height="80"
              width="80"
            />
          </Typography>
          {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box> */}

          {authStatus === "authenticated" ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={handleOpenUserMenu}
                  color="inherit"
                >
                  <AccountCircle fontSize="large" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) =>
                  setting === "Dashboard" &&
                  user?.data?.[0]?.userInfo?.platformApprovalStatus !==
                    "APPROVED" ? null : (
                    <MenuItem
                      key={setting}
                      onClick={() => handlemenuItemClick(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  )
                )}
              </Menu>
            </Box>
          ) : (
            <Button color="inherit" onClick={handleLoginOnClick}>
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
