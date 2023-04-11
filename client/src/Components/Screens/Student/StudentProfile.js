import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bcrypt from "bcryptjs";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function StudentProfile() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const salt = bcrypt.genSaltSync(10);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let email = localStorage.getItem("StudentEmail");

  useEffect(() => {
    if (email) {
      getProfile();
    }
  }, []);

  const [profile, setProfile] = useState([]);

  const getProfile = () => {
    const request = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/studentprofile/" + email, request)
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSubmit = (data) => {
    // console.log(errors)

    const spassword = bcrypt.hashSync(data.password, salt);

    fetch("http://localhost:5000/studprofedit/" + profile._id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        studentname: data.studentname,
        studentpassword: spassword,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error, { autoClose: 2500 });
        } else {
          toast.success(data.message, { autoClose: 2500 });
        }

        getProfile();
      });
  };

  return (
    <>
      <Button
        variant="text"
        style={{ color: "#FFFFFF" }}
        onClick={handleClickOpen}
      >
        <PersonIcon />
        <span
          style={{ fontWeight: 600, fontFamily: "'Readex Pro', sans-serif" }}
        >
          Profile
        </span>
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <ToastContainer />
        <AppBar
          style={{ backgroundColor: "#6C63FF" }}
          sx={{ position: "relative" }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              style={{
                fontWeight: "600",
                fontFamily: '"Readex Pro", sans-serif',
              }}
              sx={{ ml: 2, flex: 1 }}
              variant="h6"
              component="div"
            >
              Profile
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="App__profile">
          <div class="text-center">
            <AccountCircleRoundedIcon
              style={{ fontSize: 100, color: "#6C63FF" }}
            />
          </div>
          <div class="mt-5 ms-5 me-5 ">
            <form onSubmit={handleSubmit(onSubmit)} class="row g-3">
              <div class="col-6">
                <label for="name" class="form-label">
                  Student Name
                </label>
                <TextField
                  id="outlined-basic"
                  name="studentname"
                  label="Name"
                  defaultValue={profile.studentname}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("studentname", {
                    required: "Student Name is required.",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "This is not a valid name",
                    },
                  })}
                  error={Boolean(errors.studentname)}
                  helperText={errors.studentname?.message}
                />
              </div>
              <div class="col-6">
                <label for="name" class="form-label">
                  Student Branch
                </label>
                <TextField
                  id="outlined-basic"
                  label="Branch"
                  variant="outlined"
                  value={profile.studentbranch}
                  disabled={true}
                  fullWidth
                />
              </div>
              <div class="col-6">
                <label for="name" class="form-label">
                  Student Email
                </label>
                <TextField
                  id="outlined-basic"
                  label="E-mail"
                  variant="outlined"
                  value={profile.studentemail}
                  disabled={true}
                  fullWidth
                />
              </div>
              <div class="col-6">
                <label for="name" class="form-label">
                  Student password
                </label>
                <TextField
                  id="outlined-basic"
                  label="New Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  name="password"
                  {...register("password", {
                    required: "Password is required.",
                    minLength: {
                      value: 4,
                      message: "Password must be more than 4 characters",
                    },
                    maxLength: {
                      value: 10,
                      message: "Password cannot exceed more than 10 characters",
                    },
                  })}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />
              </div>
              <div class="mt-5 d-flex justify-content-center">
                <Button variant="contained" type="submit">
                  <span
                    class="fw-bold ms-1 "
                    style={{
                      fontWeight: "600",
                      fontFamily: '"Readex Pro", sans-serif',
                    }}
                  >
                    {" "}
                    Update{" "}
                  </span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </>
  );
}
