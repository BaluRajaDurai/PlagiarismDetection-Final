import React, { useState, useEffect } from "react";
import StudentNavbar from "../../Headers/StudentNavbar";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "../../Theme";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Carousel from "react-elastic-carousel";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Item from "../Item";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import TopicIcon from "@mui/icons-material/Topic";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import ApartmentIcon from "@mui/icons-material/Apartment";

const StudentHome = () => {

  let email = localStorage.getItem("StudentEmail");

  let date = new Date();
  let currentDate = date.toISOString().slice(0, -14);
  let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minutes =date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let currentTime = hours + ":" + minutes;

  let upcoming = [];
  let due = [];
  let submitted = [];

  let isUpcoming = "";
  let isDue = "";
  let isSubmitted = "";

  let navigate = useNavigate();

  const [topic, setTopic] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopic();
  }, []);

  function getTwentyFourHourTime(time) {
    time = time.toUpperCase();
    var hours = parseInt(time.substr(0, 2));
    if (time.indexOf("AM") !== -1 && hours === 12) {
      time = time.replace("12", "0");
    }
    if (time.indexOf("PM") !== -1 && hours < 12) {
      time = time.replace(hours, hours + 12);
    }
    return time.replace(/(AM|PM)/, "");
  }

  const getTopic = () => {
    const request = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/studtopic", request)
      .then((response) => response.json())
      .then((data) => {
        const topicfilter = data.filter((e) => e.studentemail === email);
        setTopic(topicfilter[0].student_topic);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const isData = Object.keys(topic).length !== 0;

  function findTopic() {
    {
      if (Object.keys(topic).length !== 0) {
        topic.map((e) => {
          const d1 = new Date(currentDate);
          const d2 = new Date(e.duedate);

          if (
            Object.values(e.ifSubmitted).filter((w) => w === email)
              .length > 0
          ) {
            submitted.push(e);
          } else if (d1 < d2) {
            upcoming.push(e);
          } else if (d1.toString() === d2.toString()) {
            const t1 = currentTime;
            const t2 = getTwentyFourHourTime(e.duetime);

            if (t1 < t2) {
              upcoming.push(e);
            } else {
              due.push(e);
            }
          } else {
            due.push(e);
          }
        });
      }
    }
  }

  function goSubmisson(id) {
    navigate(`/plagarismdetection/submisson/${id}`);
  }

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
              <TextSnippetIcon
                color="primary"
                style={{ fontSize: 50, color: "#6c63ff" }}
              />
              <span class="ms-3 fw-bold fs-5 text-dark ">All Topics </span>
              <p class="ms-5"></p>
            </div>
          </Paper>
        </Box>
      </div>

      {(findTopic(),(isUpcoming = upcoming.length !== 0), (isDue = due.length !== 0),(isSubmitted = submitted.length !== 0))}

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
          <div class="container-fluid mt-5">
            <h4 class="ms-4 mt-3">Upcoming Topics</h4>
            <div class="mt-3 ">
              {isData && isUpcoming ? (
                <Carousel itemsToShow={3}>
                  {upcoming.map((e) => (
                    <Item
                      style={{ cursor: "pointer" }}
                      onClick={() => goSubmisson(e._id)}
                    >
                      <div class="container-flex">
                        <p class="fw-bold">
                          {" "}
                          <MenuBookIcon style={{ color: "#6c63ff" }} /> Subject
                          : <span class="fw-lighter">{e.subject}</span>{" "}
                        </p>
                        <p class="fw-bold">
                          {" "}
                          <TopicIcon style={{ color: "#6c63ff" }} /> Topic :{" "}
                          <span class="fw-lighter">{e.topicname}</span>{" "}
                        </p>
                        <p class="fw-bold">
                          {" "}
                          <ApartmentIcon style={{ color: "#6c63ff" }} /> Branch
                          : <span class="fw-lighter">{e.branch}</span>{" "}
                        </p>
                        <p class="fw-bold">
                          <AccessTimeIcon style={{ color: "#6c63ff" }} /> Due
                          Time : <span class="fw-lighter">{e.duetime}</span>{" "}
                        </p>
                        <p class="fw-bold">
                          <EventIcon style={{ color: "#6c63ff" }} /> End Date :{" "}
                          <span class="fw-lighter">{e.duedate}</span>{" "}
                        </p>
                      </div>
                    </Item>
                  ))}
                </Carousel>
              ) : (
                <div class="text-center">No records to display</div>
              )}
            </div>
          </div>
          <div class="container-fluid mt-5">
            <h4 class="ms-4 mt-3 ">OnDue Topics</h4>
            <div class="mt-3 ">
              {isData && isDue ? (
                <Carousel itemsToShow={3}>
                  {due.map((e) => (
                    <Item
                      style={{ cursor: "pointer" }}
                      onClick={() => goSubmisson(e._id)}
                    >
                      <div class="container-flex">
                        <p class="fw-bold">
                          {" "}
                          <MenuBookIcon style={{ color: "#6c63ff" }} /> Subject
                          : <span class="fw-lighter">{e.subject}</span>{" "}
                        </p>
                        <p class="fw-bold">
                          {" "}
                          <TopicIcon style={{ color: "#6c63ff" }} /> Topic :{" "}
                          <span class="fw-lighter">{e.topicname}</span>{" "}
                        </p>
                        <p class="fw-bold">
                          {" "}
                          <ApartmentIcon style={{ color: "#6c63ff" }} /> Branch
                          : <span class="fw-lighter">{e.branch}</span>{" "}
                        </p>
                        <p class="fw-bold">
                          <AccessTimeIcon style={{ color: "#6c63ff" }} /> Due
                          Time : <span class="fw-lighter">{e.duetime}</span>{" "}
                        </p>
                        <p class="fw-bold">
                          <EventIcon style={{ color: "#6c63ff" }} /> End Date :{" "}
                          <span class="fw-lighter">{e.duedate}</span>{" "}
                        </p>
                      </div>
                    </Item>
                  ))}
                </Carousel>
              ) : (
                <div class="text-center">No records to display</div>
              )}
            </div>
          </div>
          <div class="container-fluid mt-5 mb-5">
            <h4 class="ms-4 mt-3 ">Submitted Topics</h4>
            <div class="mt-3 ">
              {isData && isSubmitted ? (
                <Carousel itemsToShow={3}>
                  {submitted.map((e) => (
                    <Item>
                      <div class="container-flex">
                        <p class="fw-bold">
                          {" "}
                          <MenuBookIcon style={{ color: "#6c63ff" }} /> Subject
                          : <span class="fw-lighter">{e.subject}</span>{" "}
                        </p>
                        <p class="fw-bold">
                          {" "}
                          <TopicIcon style={{ color: "#6c63ff" }} /> Topic :{" "}
                          <span class="fw-lighter">{e.topicname}</span>{" "}
                        </p>
                        <p class="fw-bold">
                          {" "}
                          <ApartmentIcon style={{ color: "#6c63ff" }} /> Branch
                          : <span class="fw-lighter">{e.branch}</span>{" "}
                        </p>
                        <p class="fw-bold">
                          <AccessTimeIcon style={{ color: "#6c63ff" }} /> Due
                          Time : <span class="fw-lighter">{e.duetime}</span>{" "}
                        </p>
                        <p class="fw-bold">
                          <EventIcon style={{ color: "#6c63ff" }} /> End Date :{" "}
                          <span class="fw-lighter">{e.duedate}</span>{" "}
                        </p>
                      </div>
                    </Item>
                  ))}
                </Carousel>
              ) : (
                <div class="text-center">No records to display</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentHome;
