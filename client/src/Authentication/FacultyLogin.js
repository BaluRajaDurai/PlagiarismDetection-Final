import * as React from "react";
import { useNavigate } from "react-router-dom";
import undraw_facultylogin from "../Assets/undraw_facultylogin.svg";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FacultyLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();

  const onSubmit = (data) => {
    //
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        facultyemail: data.email,
        facultypassword: data.password,
      }),
    };
    fetch("http://localhost:5000/facultylogin", requestOptions)
      .then((response) => response.json())
      .then((val) => {
        //   console.log(data);
        if (val.error) {
          toast.error(val.error, { autoClose: 2500 });
        } else if (val.error1) {
          toast.error(val.error1, { autoClose: 2500 });
        } else if (val.error2) {
          toast.error(val.error2, { autoClose: 2500 });
        } else {
  
          localStorage.setItem("FacultyEmail", data.email);

          toast.success(val.message, { autoClose: 2500 });
          setTimeout(() => {
            
            navigate("/plagarismdetection/facultyhome");
            
          }, 2000);
        }
      })
      .catch(function (error) {
        toast.error("Login error! Contact admin!", { autoClose: 2500 });
        console.log(error);
      });
  };
  // console.log(errors)

  return (
    <div class="container-fluid">
      <ToastContainer />
      <div class="row">
        <div class="col-6 mt-5">
          <img
            src={undraw_facultylogin}
            height={400}
            alt="welcome"
            style={{ position: "absolute", top: "20%" }}
          />
        </div>
        <div class="col-6 mt-5 ">
          <div class="mt-5 ">
            <div className="App__form">
              <h1 class="fw-bolder mt-5 mb-4" style={{ color: "#6C63FF" }}>
                Faculty Login
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
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

                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  name="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required.",
                  })}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                />

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="btns"
                >
                  Sign In
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyLogin;
