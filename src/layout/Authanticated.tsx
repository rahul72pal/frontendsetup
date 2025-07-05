import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import * as React from "react";
import { Link, Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../services/api";
import { useAppSelector } from "../store/store";
import { MdAccountCircle } from "react-icons/md";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function Authanticated() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigation = useNavigate();
  const [logoutUser] = useLogoutMutation();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (route?: "profile" | "logout") => {
    return () => {
      if (route) {
        if (route == "logout") {
          logoutUser();
        } else {
          navigation("/" + route);
        }
      }
      setAnchorEl(null);
    };
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <AppBar
        position="static"
        sx={{
          flexShrink: 0,
          zIndex: theme.zIndex.appBar,
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 48, sm: 56, md: 64 },
            px: { xs: 1, sm: 2 },
            gap: { xs: 1, sm: 2 },
          }}
        >
          <IconButton
            size={isMobile ? "medium" : "large"}
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: { xs: 1, sm: 2 },
              display: { xs: "flex", md: "none" },
            }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Box
            display="flex"
            gap={{ xs: 1, sm: 2 }}
            alignItems="center"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              flexGrow: 1,
              minWidth: 0, // Allows text to truncate if needed
            }}
          >
            <Typography
              color="white"
              variant={isMobile ? "subtitle1" : isTablet ? "h6" : "h5"}
              sx={{
                fontWeight: 600,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              App Logo
            </Typography>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: { xs: 1, sm: 2 },
              alignItems: "center",
            }}
          >
            {["profile", "services", "products"].map((page) => (
              <NavLink
                key={page}
                to={`/${page}`}
                style={({ isActive }) => ({
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 500,
                  borderBottom: isActive ? "2px solid white" : "none",
                  paddingBottom: 2,
                  fontSize: "1rem",
                })}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </NavLink>
            ))}
          </Box>

          {isAuthenticated && (
            <Box sx={{ flexShrink: 0 }}>
              <IconButton
                size={isMobile ? "medium" : "large"}
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{
                  p: { xs: 1, sm: 1.5 },
                }}
              >
                <MdAccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose()}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 120,
                    boxShadow: theme.shadows[8],
                    "& .MuiMenuItem-root": {
                      px: 2,
                      py: 1,
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                    },
                  },
                }}
              >
                <MenuItem onClick={handleClose("profile")}>Profile</MenuItem>
                <MenuItem onClick={handleClose("logout")}>Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            backgroundColor: theme.palette.background.default,
          },
        }}
      >
        <List>
          {["profile", "services", "products"].map((text) => (
            <ListItem
              button
              key={text}
              component={Link}
              to={`/${text}`}
              onClick={toggleDrawer(false)}
            >
              <ListItemText
                primary={text.charAt(0).toUpperCase() + text.slice(1)}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          minHeight: 0, // Important for proper scrolling
          width: "100%",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
