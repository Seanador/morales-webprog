import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Button from "@mui/material/Button";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const drawerWidth = 240;

const TEAL_600  = "#0d9488";
const TEAL_800  = "#115e59";
const TEAL_900  = "#134e4a";
const CYAN_100  = "#cffafe";
const ZINC_200  = "#e4e4e7";
const RED_600   = "#dc2626";
const RED_700   = "#b91c1c";

const dashboardNavItems = [
  { label: "Dashboard", title: "Dashboard", to: "/dashboard",         icon: DashboardIcon  },
  { label: "Reports",   title: "Reports",   to: "/dashboard/reports", icon: AssessmentIcon },
  { label: "Users",     title: "Users",     to: "/dashboard/users",   icon: PeopleIcon     },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: { width: `calc(${theme.spacing(8)} + 1px)` },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: TEAL_600,
  borderBottom: `2px solid ${TEAL_800}`,
  boxShadow: "none",
  backdropFilter: "blur(8px)",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    "& .MuiDrawer-paper": {
      backgroundColor: TEAL_900,
      borderRight: `1px solid ${TEAL_800}`,
      color: ZINC_200,
    },
    ...(open  && { ...openedMixin(theme), "& .MuiDrawer-paper": { ...openedMixin(theme),  backgroundColor: TEAL_900, borderRight: `1px solid ${TEAL_800}`, color: ZINC_200 } }),
    ...(!open && { ...closedMixin(theme), "& .MuiDrawer-paper": { ...closedMixin(theme), backgroundColor: TEAL_900, borderRight: `1px solid ${TEAL_800}`, color: ZINC_200 } }),
  }),
);

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "9999px",
  backgroundColor: alpha("#134e4a", 0.7),
  border: `1px solid ${alpha(CYAN_100, 0.2)}`,
  "&:hover": { backgroundColor: alpha("#134e4a", 0.9) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: { marginLeft: theme.spacing(3), width: "auto" },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: alpha(CYAN_100, 0.7),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: ZINC_200,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    [theme.breakpoints.up("md")]: { width: "20ch" },
  },
}));

const getPageTitle = (pathname) =>
  dashboardNavItems.find((item) => item.to === pathname)?.title || "Welcome";

const DashLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const navigate = useNavigate();

  const handleDrawerOpen  = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  const handleLogout      = () => navigate("/");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 5, color: CYAN_100 }}
          >
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              color: "white",
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            {pageTitle}
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon fontSize="small" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Button
            onClick={handleLogout}
            sx={{
              borderRadius: "9999px",
              backgroundColor: RED_600,
              color: "white",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              px: 3,
              py: 1,
              "&:hover": { backgroundColor: RED_700 },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: CYAN_100 }}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider sx={{ borderColor: alpha(CYAN_100, 0.15) }} />

        <List sx={{ pt: 1 }}>
          {dashboardNavItems.map((item) => {
            const { label, to, icon: NavIcon } = item;
            const isActive = location.pathname === to;
            return (
              <ListItem key={to} disablePadding sx={{ display: "block", px: 1, mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  to={to}
                  selected={isActive}
                  sx={{
                    minHeight: 48,
                    borderRadius: "9999px",
                    justifyContent: open ? "initial" : "center",
                    px: 2,
                    backgroundColor: isActive ? alpha(CYAN_100, 0.15) : "transparent",
                    "&:hover": { backgroundColor: alpha(CYAN_100, 0.1) },
                    "&.Mui-selected": {
                      backgroundColor: alpha(CYAN_100, 0.18),
                      "&:hover": { backgroundColor: alpha(CYAN_100, 0.22) },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color: isActive ? CYAN_100 : alpha(ZINC_200, 0.6),
                    }}
                  >
                    <NavIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    sx={{
                      opacity: open ? 1 : 0,
                      "& .MuiListItemText-primary": {
                        fontSize: "0.6875rem",
                        fontWeight: 600,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: isActive ? CYAN_100 : alpha(ZINC_200, 0.75),
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f0fdfa", 
          minHeight: "100vh",
        }}
      >
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashLayout;