import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function Logout() {
  let navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function logout() {

    localStorage.removeItem("FacultyEmail");
    localStorage.removeItem("StudentEmail");
    
    navigate("/plagarismdetection");

  }

  return (
    <>
      <Button
        variant="text"
        style={{ color: "#FFFFFF" }}
        onClick={handleClickOpen}
      >
        <LogoutIcon />
        <span
          style={{ fontWeight: 600, fontFamily: "'Readex Pro', sans-serif" }}
        >
          Logout
        </span>
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {
            <span style={{ fontWeight: 600 }}>
              Are you sure want to logout?
            </span>
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <span style={{ fontWeight: 600 }}>
              If yes click Agree otherwise click Disagree{" "}
            </span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ fontWeight: 600, color: "green" }}
          >
            Disagree
          </Button>
          <Button
            onClick={logout}
            style={{ fontWeight: 600, color: "red" }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Logout;
