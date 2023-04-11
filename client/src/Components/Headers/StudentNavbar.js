import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  Button,
  useScrollTrigger,
  Slide,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Logout from "../Screens/Logout";
import StudentProfile from "../Screens/Student/StudentProfile";

import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ReviewsIcon from "@mui/icons-material/Reviews";
import LogoutIcon from "@mui/icons-material/Logout";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: "red",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction={"down"} in={!trigger}>
      {children}
    </Slide>
  );
}

const StudentNavbar = (props) => {
  const classes = useStyles();
  const [anchor, setAnchor] = React.useState(null);
  const open = Boolean(anchor);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleMenu = (event) => {
    setAnchor(event.currentTarget);
  };
  return (
    <div className={classes.root}>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <div className={classes.title}>
              <p class="h4 mt-2" style={{ fontWeight: 600 }}>
                Plagiarism Checker
              </p>
            </div>
            {isMobile ? (
              <>
                <IconButton
                  color="textPrimary"
                  className={classes.menuButton}
                  edge="start"
                  aria-label="menu"
                  onClick={handleMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchor}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  KeepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                >
                  <MenuItem
                    onClick={() => setAnchor(null)}
                    component={Link}
                    to="/plagarismdetection/studenthome"
                  >
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <Typography variant="h6"> Home</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => setAnchor(null)}
                    component={Link}
                    to="/plagarismdetection/viewcomments"
                  >
                    <ListItemIcon>
                      <ReviewsIcon />
                    </ListItemIcon>
                    <Typography variant="h6"> View Comments</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => setAnchor(null)}
                    component={Link}
                    to="/plagarismdetection"
                  >
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <Typography variant="h6"> Logout </Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <div style={{ marginRight: "2rem" }}>
                <Button
                  variant="text"
                  component={Link}
                  to="/plagarismdetection/studenthome"
                  style={{ color: "#FFFFFF" }}
                >
                  <HomeIcon />
                  <span style={{ fontWeight: 600 }}>Home</span>
                </Button>
                <Button
                  variant="text"
                  component={Link}
                  to="/plagarismdetection/viewcomments"
                  style={{ color: "#FFFFFF" }}
                >
                  <ReviewsIcon />
                  <span style={{ fontWeight: 600 }}>View Comments</span>
                </Button>

                <StudentProfile />

                <Logout />
              </div>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </div>
  );
};

export default StudentNavbar;
