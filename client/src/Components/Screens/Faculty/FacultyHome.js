import React, { useState, useEffect } from "react";
import FacultyNavbar from "../../Headers/FacultyNavbar";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "../../Theme";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Carousel from "react-elastic-carousel";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Item from "../Item";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TopicIcon from "@mui/icons-material/Topic";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import ApartmentIcon from "@mui/icons-material/Apartment";

const FacultyHome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  let email = localStorage.getItem("FacultyEmail");

  useEffect(() => {
    getTopic();
  }, []);

  let navigate = useNavigate();

  const getTopic = () => {
    const request = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/topicdetails/" + email, request)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setData(data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function goTopic(id) {
    navigate(`/plagarismdetection/topic/${id}`);
  }

  const isData = Object.keys(data).length !== 0;

  return (
    <div>
      <ThemeProvider theme={Theme}>
        <FacultyNavbar />
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
              <PeopleOutlineTwoToneIcon
                color="primary"
                style={{ fontSize: 50 }}
              />
              <span class="ms-3 fw-bold fs-5 text-dark ">Submissons </span>
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
            <h4 class="ms-4 mt-5">Available Topics</h4>
            <div class="mt-5 ms-5 me-5 ">
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
                    <Carousel itemsToShow={3}>
                      {data.map((e) => (
                        <Item
                          style={{ cursor: "pointer" }}
                          onClick={() => goTopic(e._id)}
                        >
                          <div class="container-flex">
                            <p class="fw-bold">
                              {" "}
                              <MenuBookIcon style={{ color: "#6c63ff" }} />{" "}
                              Subject :{" "}
                              <span class="fw-lighter">{e.subject}</span>{" "}
                            </p>
                            <p class="fw-bold">
                              {" "}
                              <TopicIcon style={{ color: "#6c63ff" }} /> Topic :{" "}
                              <span class="fw-lighter">{e.topicname}</span>{" "}
                            </p>
                            <p class="fw-bold">
                              {" "}
                              <ApartmentIcon
                                style={{ color: "#6c63ff" }}
                              />{" "}
                              Branch :{" "}
                              <span class="fw-lighter">{e.branch}</span>{" "}
                            </p>
                            <p class="fw-bold">
                              <AccessTimeIcon style={{ color: "#6c63ff" }} />{" "}
                              Due Time :{" "}
                              <span class="fw-lighter">{e.duetime}</span>{" "}
                            </p>
                            <p class="fw-bold">
                              <EventIcon style={{ color: "#6c63ff" }} /> End
                              Date : <span class="fw-lighter">{e.duedate}</span>{" "}
                            </p>
                          </div>
                        </Item>
                      ))}
                    </Carousel>
                  ) : (
                    <div class="text-center">No records to display</div>
                  )}
                </>
              )}
            </div>
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default FacultyHome;
