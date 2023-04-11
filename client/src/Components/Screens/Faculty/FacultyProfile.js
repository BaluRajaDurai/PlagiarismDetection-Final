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
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bcrypt from "bcryptjs";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FacultyProfile() {

  const [open, setOpen] = React.useState(false);

  let email = localStorage.getItem("FacultyEmail");

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


  useEffect(() => {
    if (email) {
      getProfile();
    }
  }, []);

  //facultyprofile
  const [profile, setProfile] = useState([]);

  const getProfile = () => {
    const request = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/facultydetails/" + email, request)
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

    const fpassword = bcrypt.hashSync(data.password, salt);

    fetch("http://localhost:5000/profedit/" + profile._id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        facultyname: data.facultyname,
        facultypassword: fpassword,
        facultybranch: data.branch,
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
                  Faculty Name
                </label>
                <TextField
                  id="outlined-basic"
                  name="facutyname"
                  label="Name"
                  defaultValue={profile.facultyname}
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register("facultyname", {
                    required: "Faculty Name is required.",
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      message: "This is not a valid name",
                    },
                  })}
                  error={Boolean(errors.facultyname)}
                  helperText={errors.facultyname?.message}
                />
              </div>
              <div class="col-6">
                <label for="name" class="form-label">
                  Faculty Department
                </label>
                <FormControl fullWidth style={{ marginBottom: "27px" }}>
                  <InputLabel id="simple-select-label">Dept</InputLabel>
                  <Select
                    labelId="simple-select-label"
                    id="simple-select"
                    name="Dept"
                    label="Age"
                    defaultValue={profile.facultybranch}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("branch", { required: true })}
                    error={Boolean(errors.branch)}
                  >
                    <MenuItem value={"CSE"}>CSE</MenuItem>
                    <MenuItem value={"IT"}>IT</MenuItem>
                    <MenuItem value={"ECE"}>ECE</MenuItem>
                    <MenuItem value={"EEE"}>EEE</MenuItem>
                  </Select>
                  {errors?.branch?.type === "required" && (
                    <p
                      class="ms-3 mt-1"
                      style={{ color: "#dc3545", fontSize: "13px" }}
                    >
                      Branch is required.
                    </p>
                  )}
                </FormControl>
              </div>
              <div class="col-6">
                <label for="name" class="form-label">
                  Faculty Email
                </label>
                <TextField
                  id="outlined-basic"
                  label="E-mail"
                  variant="outlined"
                  value={profile.facultyemail}
                  disabled={true}
                  fullWidth
                />
              </div>
              <div class="col-6">
                <label for="name" class="form-label">
                  Faculty password
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
