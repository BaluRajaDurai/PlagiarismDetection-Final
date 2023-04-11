import undraw_welcome from "../../Assets/undraw_welcome.svg";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkIcon from "@mui/icons-material/Work";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const WelcomePage = () => {
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-6 mt-5">
          <img src={undraw_welcome} alt="welcome" />
        </div>
        <div class="col-6">
          <div
            class="mt-5 "
            style={{ position: "absolute", top: "10%", color: "#6C63FF" }}
          >
            <h1 class="fw-bolder mt-5">
              Check out — Welcome To Plagiarism Checker App!
            </h1>

            <div class="mt-5">
              <List sx={{ width: "100%", maxWidth: 360, bgcolor: "#f2f2f2" }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PeopleAltIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Link
                    href="/plagarismdetection/studentlogin"
                    underline="none"
                  >
                    {
                      <ListItemText
                        primary={
                          <Typography
                            style={{
                              fontWeight: "600",
                              fontFamily: '"Readex Pro", sans-serif',
                            }}
                          >
                            Student
                          </Typography>
                        }
                        secondary="continue as student"
                      />
                    }
                  </Link>
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <WorkIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Link
                    href="/plagarismdetection/facultylogin"
                    underline="none"
                  >
                    {
                      <ListItemText
                        primary={
                          <Typography
                            style={{
                              fontWeight: "600",
                              fontFamily: '"Readex Pro", sans-serif',
                            }}
                          >
                            Faculty
                          </Typography>
                        }
                        secondary="continue as faculty"
                      />
                    }
                  </Link>
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AdminPanelSettingsIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <Link href="/plagarismdetection/adminlogin" underline="none">
                    {
                      <ListItemText
                        primary={
                          <Typography
                            style={{
                              fontWeight: "600",
                              fontFamily: '"Readex Pro", sans-serif',
                            }}
                          >
                            Admin
                          </Typography>
                        }
                        secondary="continue as admin"
                      />
                    }
                  </Link>
                </ListItem>
              </List>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
