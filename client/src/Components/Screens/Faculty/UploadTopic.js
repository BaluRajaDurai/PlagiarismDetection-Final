import FacultyNavbar from "../../Headers/FacultyNavbar";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "../../Theme";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button, FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MaterialTable from "material-table";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DescriptionIcon from "@mui/icons-material/Description";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

const UploadTopic = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataloading, setDataloading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getTopic();
    getName();
  }, []);

  let email = localStorage.getItem("FacultyEmail");

  function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM " : " PM "; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  const onSubmit = (data) => {
    
    setLoading(true);

    const time = tConvert(data.time);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject: data.subjectname,
        topicname: data.topicname,
        branch: data.branch,
        duedate: data.date,
        duetime: time,
        femail: email,
        fname: name.facultyname,
        ifSubmitted: false,
      }),
    };
    fetch("http://localhost:5000/addtopic", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error, { autoClose: 2500 });
        } else {
          setLoading(false);
          toast.success(data.message, { autoClose: 2500 });
          window.location.reload();
        }
      })
      .catch(function (error) {
        toast.error("Temperory Error!", { autoClose: 2500 });
        console.log(error);
      });

    // console.log(errors)
  };

  const getName = () => {
    const request = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/facultydetails/" + email, request)
      .then((response) => response.json())
      .then((data) => {
        setName(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getTopic = () => {
    const request = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/topicdetails/" + email, request)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setDataloading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const columns = [
    {
      title: "Topic Name",
      field: "topicname",
      validate: (rowData) =>
        rowData.topicname === undefined || rowData.topicname === ""
          ? "Required"
          : true,
    },
    {
      title: "Subject",
      field: "subject",
      validate: (rowData) =>
        rowData.subject === undefined || rowData.subject === ""
          ? "Required"
          : true,
    },
    {
      title: "Branch",
      field: "branch",
      validate: (rowData) =>
        rowData.branch === undefined || rowData.branch === ""
          ? "Required"
          : true,
    },
    {
      title: "Due Time",
      field: "duetime",
      validate: (rowData) =>
        rowData.duetime === undefined || rowData.duetime === ""
          ? "Required"
          : true,
    },
    {
      title: "End Date",
      field: "duedate",
      validate: (rowData) =>
        rowData.duedate === undefined || rowData.duedate === ""
          ? "Required"
          : true,
    },
  ];

  return (
    <div>
      <ThemeProvider theme={Theme}>
        <FacultyNavbar />
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
              <DescriptionIcon style={{ fontSize: 50, color: "#6c63ff" }} />
              <span class="ms-3 fw-bold fs-5 text-dark ">All Topics</span>
              <p class="ms-5"></p>
            </div>
          </Paper>
        </Box>
      </div>
      <div class="mt-4 text-center">
        <Button
          variant="contained"
          size="large"
          style={{ fontFamily: '"Readex Pro", sans-serif', fontWeight: 600 }}
          startIcon={<AddCircleIcon />}
          data-bs-toggle="modal"
          data-bs-target="#addfaculty"
        >
          Add Topic
        </Button>
      </div>

      {dataloading ? (
        <Backdrop
          sx={{ color: "#6C63FF", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={dataloading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          <div class="container-fluid mt-4 ">
            <MaterialTable
              title={<h4>Added Topics</h4>}
              columns={columns}
              data={data}
              icons={{
                Delete: () => <DeleteOutline style={{ color: "#FF6347" }} />,
                Edit: () => <EditIcon style={{ color: "#0000FF" }} />,
              }}
              options={{
                sorting: true,
                exportButton: true,
                headerStyle: {
                  backgroundColor: "#918AFF",
                  fontWeight: "bold",
                  fontSize: 16,
                },
                actionsColumnIndex: -1,
                addRowPosition: "first",
              }}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    //Backend call
                    fetch("http://localhost:5000/topicedit/" + oldData._id, {
                      method: "PUT",
                      headers: {
                        "Content-type": "application/json",
                      },
                      body: JSON.stringify(newData),
                    })
                      .then((resp) => resp.json())
                      .then((data) => {
                        if (data.error) {
                          toast.error(data.error, { autoClose: 2500 });
                        } else {
                          toast.success(data.message, { autoClose: 2500 });
                        }

                        getTopic();
                        resolve();
                      });
                  }),

                onRowDelete: (oldData) =>
                  new Promise((resolve, reject) => {
                    fetch("http://localhost:5000/deletetopic/" + oldData._id, {
                      method: "DELETE",
                      headers: {
                        "Content-type": "application/json",
                      },
                    })
                      .then((resp) => resp.json())
                      .then((data) => {
                        if (data.error) {
                          toast.error(data.error, { autoClose: 2500 });
                        } else {
                          toast.success(data.message, { autoClose: 2500 });
                        }

                        getTopic();
                        resolve();
                      });
                  }),
              }}
            />
          </div>
        </>
      )}

      {/* Modal  */}
      <div
        class="modal fade "
        id="addfaculty"
        tabindex="-1"
        aria-labelledby="addfaculty"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addfaculty">
                Add Topic
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit(onSubmit)} class="row g-3">
                <div class="col-6">
                  <label for="name" class="form-label">
                    Subject Name
                  </label>
                  <TextField
                    id="outlined-basic"
                    name="subjectname"
                    label="Subject"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("subjectname", {
                      required: "Subject Name is required.",
                    })}
                    error={Boolean(errors.subjectname)}
                    helperText={errors.subjectname?.message}
                  />
                </div>
                <div class="col-6">
                  <label for="name" class="form-label">
                    Topic Name
                  </label>
                  <TextField
                    id="outlined-basic"
                    name="tname"
                    label="Topic"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("topicname", {
                      required: "Topic Name is required.",
                    })}
                    error={Boolean(errors.topicname)}
                    helperText={errors.topicname?.message}
                  />
                </div>
                <div class="col-6">
                  <label for="name" class="form-label">
                    Select Branch
                  </label>
                  <FormControl fullWidth style={{ marginBottom: "27px" }}>
                    <InputLabel id="simple-select-label">Branch</InputLabel>
                    <Select
                      labelId="simple-select-label"
                      id="simple-select"
                      name="branch"
                      label="Age"
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
                    Due Time
                  </label>
                  <TextField
                    id="time"
                    label="Time"
                    type="time"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("time", {
                      required: "Time is required.",
                    })}
                    error={Boolean(errors.time)}
                    helperText={errors.time?.message}
                  />
                </div>
                <div class="col-6">
                  <label for="name" class="form-label">
                    Due Date
                  </label>
                  <TextField
                    id="date"
                    label="Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("date", {
                      required: "Date is required.",
                    })}
                    error={Boolean(errors.date)}
                    helperText={errors.date?.message}
                  />
                </div>
                <div class="mt-4 d-flex justify-content-center">
                  <LoadingButton
                    variant="contained"
                    style={{ fontFamily: '"Readex Pro", sans-serif' }}
                    loading={loading}
                    type="submit"
                  >
                    Submit
                  </LoadingButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadTopic;
