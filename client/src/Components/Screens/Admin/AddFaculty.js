import AdminNavbar from "../../Headers/AdminNavbar";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "../../Theme";
import React from "react";
import TextField from "@mui/material/TextField";
import { Button, FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bcrypt from "bcryptjs";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const salt = bcrypt.genSaltSync(10);

const AddFaculty = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

    const hashedPassword = bcrypt.hashSync(data.password, salt);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        facultyname: data.name,
        facultybranch: data.branch,
        facultyemail: data.email,
        facultypassword: hashedPassword,
        facultytmprypassword: data.password,
      }),
    };
    fetch("http://localhost:5000/addfaculty", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //   console.log(data);
        if (data.error) {
          toast.error(data.error, { autoClose: 2500 });
        } else if (data.alert) {
          toast.error(data.alert, { autoClose: 2500 });
        } else {
          toast.success(data.message, { autoClose: 2500 });
          reset();
        }
      })
      .catch(function (error) {
        toast.error("Temperory Error!", { autoClose: 2500 });
        console.log(error);
      });
  };

  return (
    <div>
      <ThemeProvider theme={Theme}>
        <AdminNavbar />
      </ThemeProvider>
      <ToastContainer />
      <div class="mt-5">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: "100%",
              height: 128,
              marginTop: "2%",
            },
          }}
        >
          <Paper elevation={1}>
            <div class="mt-5 ms-5 ">
              <GroupAddIcon style={{ fontSize: 50, color: "#6c63ff" }} />
              <span class="ms-3 fw-bold fs-5 text-dark ">New Faculty</span>
              <p class="ms-5"></p>
            </div>
          </Paper>
        </Box>
      </div>
      <div class="container-fluid mt-3">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: "100%",
              height: 450,
              marginTop: "2%",
            },
          }}
        >
          <Paper elevation={1}>
            <h4 class="ms-4 mt-3">Add Faculty</h4>
            <div class="mt-5 ms-5 me-5 ">
              <form onSubmit={handleSubmit(onSubmit)} class="row g-3">
                <div class="col-6">
                  <label for="name" class="form-label">
                    Faculty Name
                  </label>
                  <TextField
                    id="outlined-basic"
                    name="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    {...register("name", {
                      required: "Faculty Name is required.",
                      pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: "This is not a valid name",
                      },
                    })}
                    error={Boolean(errors.name)}
                    helperText={errors.name?.message}
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
                      name="branch"
                      label="Age"
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
                        Department is required.
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
                    fullWidth
                    name="email"
                    {...register("email", {
                      required: "E-mail Address is required.",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "This is not a valid email",
                      },
                    })}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                  />
                </div>
                <div class="col-6">
                  <label for="name" class="form-label">
                    Faculty password
                  </label>
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    name="password"
                    type="password"
                    {...register("password", {
                      required: "Password is required.",
                      minLength: {
                        value: 4,
                        message: "Password must be more than 4 characters",
                      },
                      maxLength: {
                        value: 10,
                        message:
                          "Password cannot exceed more than 10 characters",
                      },
                    })}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                  />
                </div>
                <div class="mt-5 d-flex justify-content-center">
                  <Button variant="contained" type="submit">
                    <AddCircleIcon />
                    <span class="fw-bold ms-1 "> Add Faculty </span>
                  </Button>
                </div>
              </form>
            </div>
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default AddFaculty;
