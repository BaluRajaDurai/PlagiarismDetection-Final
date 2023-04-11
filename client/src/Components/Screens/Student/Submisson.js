import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import StudentNavbar from "../../Headers/StudentNavbar";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "../../Theme";
import BackupIcon from "@mui/icons-material/Backup";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import LoadingButton from "@mui/lab/LoadingButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PublishIcon from "@mui/icons-material/Publish";

const Submisson = () => {
  let date = new Date();
  let currentDate = date.toISOString().slice(0, -14);

  var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  var am_pm = date.getHours() >= 12 ? "PM" : "AM";
  hours = hours < 10 ? "0" + hours : hours;
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let currentTime = hours + ":" + minutes + " " + am_pm;

  let email = localStorage.getItem("StudentEmail");

  let navigate = useNavigate();

  const params = useParams();
  const id = params.id;
  const fileInput = React.createRef();

  const [topicInfo, setTopicInfo] = useState([]);
  const [studentInfo, setStudentInfo] = useState([]);
  const [submitted, setStubmitted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [dataloading, setDataloading] = useState(false);

  useEffect(() => {
    getTopic();
    getStudent();
  }, []);

  function getTopic() {
    const request = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/singletopic/" + id, request)
      .then((response) => response.json())
      .then((data) => {
        setTopicInfo(data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const isData = Object.keys(topicInfo).length !== 0;

  function getStudent() {
    const request = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/studentprofile/" + email, request)
      .then((response) => response.json())
      .then((data) => {
        setStudentInfo(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const redirect = () => {
    navigate("/plagarismdetection/studenthome");
  };

  const handleSubmit = (e) => {

    
    e.preventDefault()

    const myFile = document.getElementById("myFile").value;
    const idxDot = myFile.lastIndexOf(".") + 1;
    const extFile = myFile.substr(idxDot, myFile.length).toLowerCase();
    if ( extFile!=="png"){
      toast.error("Only png files are allowewd!", { autoClose: 2500 });
    }
    else{

      setDataloading(true);

      let formdata = new FormData();
      formdata.append("file", fileInput.current.files[0]);
      formdata.append("id", email);
  
  
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentname: studentInfo.studentname,
          studentemail: email,
          branch: studentInfo.studentbranch,
          duedate: currentDate,
          duetime: currentTime,
          docname: fileInput.current.files[0].name,
          topicname: topicInfo[0].topicname,
          subjectname: topicInfo[0].subject,
          topicid: topicInfo[0]._id,
          fname: topicInfo[0].fname,
          femail: topicInfo[0].femail,
          comment: "",
          result: "",
        }),
      };
      fetch("http://localhost:5000/topicsubmisson", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error, { autoClose: 2500 });
          } else {
          const requestOption = {
            method: "POST",
            body: formdata,
          };
          fetch("http://localhost:8000/upload_file/" + topicInfo[0]._id, requestOption)
            .then((response) => response.json())
            .then((value) => {
  
              fetch("http://localhost:5000/submitverify/" + topicInfo[0]._id, {
                method: "PUT",
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify({
                  studentemail: email,
                }),
              });
  
              toast.success(value.message, { autoClose: 2500 });
  
              setDataloading(false);
  
              setTimeout(() => {
                //  console.log('This will run after 1 second!')
                redirect();
              }, 2500);
  
             
            })
            .catch(function (error) {
              console.log("error");
            });
          }
        })
        .catch(function (error) {
          toast.error("Temperory Error!", { autoClose: 2500 });
          console.log(error);
        });
  
    }   


   

   

    // const request = {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    // };
    // fetch("http://localhost:5000/submitverify/" + topicInfo[0]._id, request)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // console.log("working");
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

   
  };

  return (
    <div>
      <ToastContainer />
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
              <BackupIcon style={{ fontSize: 50, color: "#6c63ff" }} />
              <span class="ms-3 fw-bold fs-5 text-dark ">Topic Submisson</span>
              <p class="ms-5"></p>
            </div>
          </Paper>
        </Box>
        <div class="container-fluid mt-3">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: "100%",
                height: 300,
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
                  <div class="container mt-5">
                    {isData ? (
                      <form onSubmit={handleSubmit}>
                        <div class="container mt-5">
                          <table class="table">
                            <thead style={{ backgroundColor: "#a29bfe" }}>
                              <tr>
                                <th>Topic Name</th>
                                <th>Subject</th>
                                <th>End Date</th>
                                <th>Due Time</th>
                                <th>Faculty Name</th>
                                <th>Document</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{topicInfo[0].topicname}</td>
                                <td>{topicInfo[0].subject}</td>
                                <td>{topicInfo[0].duedate}</td>
                                <td>{topicInfo[0].duetime}</td>
                                <td>{topicInfo[0].fname}</td>
                                <td>
                                  <input
                                    type="file"
                                    id="myFile"
                                    name="filename"
                                    ref={fileInput}
                                    onChange={() => setStubmitted(false)}
                                    class="button"
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="d-flex justify-content-center mt-5">

                        <LoadingButton
                            disabled={submitted}
                            variant="contained"
                            startIcon={<PublishIcon />}
                            style={{fontWeight: "600", fontFamily: '"Readex Pro", sans-serif' }}
                            loading={dataloading}
                            type="submit"
                        >
                            Submit
                        </LoadingButton>

                        </div>
                      </form>
                    ) : (
                      <div class="text-center">No records to display</div>
                    )}
                  </div>
                </>
              )}
            </Paper>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Submisson;
