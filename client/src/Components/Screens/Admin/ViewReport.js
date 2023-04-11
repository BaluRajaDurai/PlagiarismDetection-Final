import React, { useState, useEffect } from "react";
import AdminNavbar from "../../Headers/AdminNavbar";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "../../Theme";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import ListAltIcon from "@mui/icons-material/ListAlt";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import usePagination from "../Pagination";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewReport = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState([]);
  const [id, setId] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReport();
  }, []);

  const getReport = () => {
    const request = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/viewreport", request)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteReport = (id) => {

    const request = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/deletereport/" + id, request)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error, { autoClose: 2500 });
        } else {
          toast.success(data.message, { autoClose: 2500 });
          setTimeout(() => {
            //  console.log('This will run after 1 second!')
            window.location.reload();
          }, 1500);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function goComment(name, value) {
    setName(name);
    setId(value);
  }

  const handleSubmit = (event) => {
    
    event.preventDefault();
  

    fetch("http://localhost:5000/adminreport/" + id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        comment: message,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error, { autoClose: 2500 });
        } else {
          toast.success(data.message, { autoClose: 2500 });
        }
      });
  };

  const isData = Object.keys(data).length !== 0;

  let [page, setPage] = useState(1);
  const PER_PAGE = 4;

  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <div>
      <ThemeProvider theme={Theme}>
        <AdminNavbar />
      </ThemeProvider>
      <ToastContainer />
      {loading ? (
        <Backdrop
          sx={{ color: "#6C63FF", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
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
                  <ListAltIcon style={{ fontSize: 50, color: "#6c63ff" }} />
                  <span class="ms-3 fw-bold fs-5 text-dark ">
                    Available Reports
                  </span>
                  <p class="ms-5"></p>
                </div>
              </Paper>
            </Box>
          </div>
          <div class="container-fluid">
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 1,
                  width: "100%",
                  height: 600,
                  marginTop: "2%",
                },
              }}
            >
              <Paper elevation={1}>
                {isData ? (
                  <div class="row">
                    {_DATA.currentData().map((v) => {
                      return (
                        <div class="col-6 mt-4">
                          <div class="card">
                            <div class="card-header">
                              <h5 class="text-start ">
                                Report from {v.facultyname}
                              </h5>
                            </div>
                            <div class="card-body">
                              <p class="card-text">Subject : {v.subject}</p>
                              <p class="card-text">Topic : {v.topic}</p>
                              <p class="card-text">Report : {v.report}</p>
                              <Button
                                variant="contained"
                                size="small"
                                style={{ marginTop: "4%", fontWeight: 600 }}
                                endIcon={<EditIcon />}
                                data-bs-toggle="modal"
                                data-bs-target="#addreview"
                                onClick={() => goComment(v.facultyname, v._id)}
                              >
                                Add Review
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                style={{
                                  marginLeft: "5%",
                                  marginTop: "4%",
                                  fontWeight: 600,
                                }}
                                startIcon={<DeleteForeverIcon />}
                                onClick={() => deleteReport(v._id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div class="text-center mt-5 fw-bold">
                    No reports to display
                  </div>
                )}
              </Paper>
            </Box>
            <div class="mt-2 mb-2 d-flex justify-content-end">
              <Pagination
                showFirstButton
                showLastButton
                onChange={handleChange}
                count={count}
                page={page}
              />
            </div>
          </div>
          <div class="container mt-3"></div>
          <div
            class="modal fade"
            id="addreview"
            tabindex="-1"
            aria-labelledby="addreviewLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Write a review
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div class="mb-3 text-start">
                      <label for="recipient-name" class="col-form-label">
                        Recipient:
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="recipient-name"
                        value={name}
                      />
                    </div>
                    <div class="mb-3 text-start">
                      <label for="message-text" class="col-form-label ">
                        Message:
                      </label>
                      <textarea
                        class="form-control"
                        id="message-text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button class="btn btn-primary" type="submit">
                        Send message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewReport;
