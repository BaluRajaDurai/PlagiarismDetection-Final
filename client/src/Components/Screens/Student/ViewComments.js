import StudentNavbar from "../../Headers/StudentNavbar";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "../../Theme";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import usePagination from "../Pagination";

const ViewComments = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  let email = localStorage.getItem("StudentEmail");

  useEffect(() => {
    getComment();
  }, []) 
  

  let [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const getComment = () => {
    const request = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/submitdetails/" + email, request)
      .then((response) => response.json())
      .then((data) => {
        const commentFilter = data.filter((e) => e.comment !== "");
        setData(commentFilter);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const isData = Object.keys(data).length !== 0;

  return (
    <div>
      <ThemeProvider theme={Theme}>
        <StudentNavbar />
      </ThemeProvider>
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
              <SpeakerNotesIcon style={{ fontSize: 50, color: "#6c63ff" }} />
              <span class="ms-3 fw-bold fs-5 text-dark "> Comments </span>
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
              height: 460,
              marginTop: "2%",
            },
          }}
        >
          <Paper elevation={1}>
            {loading ? (
              <Backdrop
                sx={{
                  color: "#6C63FF",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            ) : (
              <>
                {isData ? (
                  <div class="row">
                    {_DATA.currentData().map((v) => {
                      return (
                        <div class="col-4 mt-4">
                          <div
                            class="card  text-dark bg-ligh mb-3"
                            style={{ borderColor: "#918AFF" }}
                          >
                            <div
                              class="card-header text-light"
                              style={{ backgroundColor: "#918AFF" }}
                            >
                              <h5>Comment From {v.fname}</h5>
                            </div>
                            <div class="card-body text-dark">
                              <p class="card-text">Subject : {v.subjectname}</p>
                              <p class="card-text">Topic : {v.topicname}</p>
                              <p class="card-text">Comment : {v.comment}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div class="text-center mt-5 fw-bold">
                    No comments to display
                  </div>
                )}
              </>
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
    </div>
  );
};

export default ViewComments;
