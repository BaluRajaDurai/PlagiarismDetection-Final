import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FacultyNavbar from "../../Headers/FacultyNavbar";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "../../Theme";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MaterialTable from "material-table";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { css } from "@emotion/react";
import ClockLoader from "react-spinners/ClockLoader";

const Topic = () => {

  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

  let email = localStorage.getItem("FacultyEmail");

  const params = useParams();
  const id = params.id;

  const [data, setData] = useState([]);
  const [comment, setComment] = useState([]);
  const [message, setMessage] = useState("");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(true);
  const [loader,setLoader] = useState(false)

  useEffect(() => {
    getTopics();
  }, []);

  const getTopics = () => {
    const request = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/topicsubmitted/" + email, request)
      .then((response) => response.json())
      .then((data) => {
        const topicfilter = data.filter((e) => e.topicid === id);
        setData(topicfilter);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const checkPlag = () => {

    setLoader(true)

    let topic = data[0].topicid;

    const request = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/checkplagiarism/" + topic, request)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error, { autoClose: 2500 });
        } else {
          toast.success(data.message, { autoClose: 2500 });
          getTopics();
          setLoader(false)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function goComment(id) {
    setComment(id);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:5000/addcomment/" + comment._id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        studentname: data.studentname,
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


  const handleReport = (event) => {
    event.preventDefault();

    if (data.length > 0) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          facultyname: data[0].fname,
          facultyemail: email,
          subject: data[0].subjectname,
          topic: data[0].topicname,
          report: report,
          comment: "",
        }),
      };
      fetch("http://localhost:5000/sendreport", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error, { autoClose: 2500 });
          } else {
            toast.success(data.message, { autoClose: 2500 });
          }
        })
        .catch(function (error) {
          toast.error("Temperory Error!", { autoClose: 2500 });
          console.log(error);
        });
    } else {
      toast.error("No one Submitted! Unable to Send!", { autoClose: 2500 });
    }
  };

  const columns = [
    { title: "Student Name", field: "studentname" },
    { title: "Doc Name", field: "docname" },
    { title: "Branch", field: "branch" },
    { title: "Sumitted On", field: "duedate" },
    { title: "Time", field: "duetime" },
    { title: "Plag Percentage", field: "result" },
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
              <PeopleOutlineTwoToneIcon
                style={{ fontSize: 50, color: "#6c63ff" }}
              />
              <span class="ms-3 fw-bold fs-5 text-dark ">
                Submisson Details
              </span>
              <p class="ms-5"></p>
            </div>
          </Paper>
        </Box>
      </div>

      {loading ? (
        <Backdrop
          sx={{ color: "#6C63FF", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
       
          <div class="container-fluid mt-4">

                {loader ? (

                  
            <div class="mt-5">
              <ClockLoader color="#918AFF" loading={loader} css={override} size={250} />
              <h6 class="text-center mt-5" style={{ fontSize: 22, color: "#6c63ff" }}>
                Checking for plagiarism please wait........
              </h6>
            </div>
                    
            
            ) : (
            
         
            <MaterialTable
              title={<h4>Submitted Topics</h4>}
              columns={columns}
              data={data}
              options={{
                rowStyle: (rowData) => {
                  if (rowData.result === "") {
                    return {
                      color: "black",
                    };
                  } else if (rowData.result >= 81 && rowData.result <= 100) {
                    return {
                      color: "red",
                    };
                  } else if (rowData.result >= 41 && rowData.result <= 80) {
                    return {
                      color: "orange",
                    };
                  } else if (rowData.result >= 0 && rowData.result <= 40) {
                    return {
                      color: "green",
                    };
                  } else {
                    return {};
                  }
                },

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
              components={{
                Action: (props) => (
                  <Button
                    onClick={(event) => props.action.onClick(event, props.data)}
                    variant="contained"
                    size="small"
                    style={{
                      fontFamily: '"Readex Pro", sans-serif',
                      fontWeight: 600,
                      backgroundColor: "#6c63ff",
                    }}
                    startIcon={<AddCircleIcon />}
                    data-bs-toggle="modal"
                    data-bs-target="#addcomment"
                  >
                    Comment
                  </Button>
                ),
              }}
              actions={[
                {
                  tooltip: "Add User",
                  onClick: (event, rowData) => goComment(rowData),
                },
              ]}
            />
            )}

          </div>

          <div class="container-flex ms-4 mt-4 mb-4">
            <div class="row">
              <div class="col-2">
                <Button
                  variant="contained"
                  startIcon={<CheckCircleIcon />}
                  style={{
                    fontFamily: '"Readex Pro", sans-serif',
                    fontWeight: 600,
                    backgroundColor: "#6c63ff",
                  }}
                  onClick={() => checkPlag()}
                >
                  Check Plagiarism
                </Button>
              </div>
              <div class="col-2">
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  style={{
                    fontFamily: '"Readex Pro", sans-serif',
                    fontWeight: 600,
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#addreport"
                >
                  Send Report
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      <div
        class="modal fade"
        id="addcomment"
        tabindex="-1"
        aria-labelledby="addcommentlabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add a comment
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
                    value={comment.studentname}
                  />
                </div>
                <div class="mb-3 text-start">
                  <label for="message-text" class="col-form-label ">
                    Message:
                  </label>
                  <textarea
                    class="form-control"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
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

      <div
        class="modal fade"
        id="addreport"
        tabindex="-1"
        aria-labelledby="addreportlabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Send Report
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleReport}>
                <div class="mb-3 text-start">
                  <label for="recipient-name" class="col-form-label">
                    Recipient:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="recipient-name"
                    value="Admin"
                  />
                </div>
                <div class="mb-3 text-start">
                  <label for="message-text" class="col-form-label ">
                    Message:
                  </label>
                  <textarea
                    class="form-control"
                    value={report}
                    onChange={(e) => setReport(e.target.value)}
                    required
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
                    Send Report
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic;
