import React from "react";
import undraw_adminlogin from "../Assets/undraw_adminlogin.svg";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();

  const onSubmit = (data) => {
    // console.log(data);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        adminemail: data.email,
        adminpassword: data.password,
      }),
    };
    fetch("http://localhost:5000/adminlogin", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        //   console.log(data);
        if (data.error) {
          toast.error(data.error, { autoClose: 2500 });
        } else if (data.fail) {
          toast.error(data.fail, { autoClose: 2500 });
        } else {
          localStorage.setItem("loggedIn", true);
          toast.success(data.message, { autoClose: 2500 });
          setTimeout(() => {
            //  console.log('This will run after 1 second!')
            navigate("/plagarismdetection/adminhome");
          }, 2000);
        }
      })
      .catch(function (error) {
        toast.error("Technical error!", { autoClose: 2500 });
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
            src={undraw_adminlogin}
            height={600}
            alt="welcome"
            style={{ position: "absolute", marginLeft: "6%" }}
          />
        </div>
        <div class="col-6 mt-5 ">
          <div class="mt-5 " style={{ position: "absolute", marginLeft: "1%" }}>
            <div className="App__form">
              <h1 class="fw-bolder mt-5 mb-4" style={{ color: "#6C63FF" }}>
                Admin Login
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

export default AdminLogin;
