import React, { useEffect, useState } from "react";
import AdminNavbar from "../../Headers/AdminNavbar";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "../../Theme";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { ToastContainer, toast } from "react-toastify";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import MaterialTable from "material-table";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

const AdminHome = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFaculty();
  }, []);

  const getFaculty = () => {
    const request = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/facultydetails", request)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const columns = [
    { title: "Faculty Name", field: "facultyname" },
    { title: "Faculty Department", field: "facultybranch" },
    { title: "Faculty Email", field: "facultyemail" },
  ];

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
                  <PeopleOutlineTwoToneIcon
                    color="primary"
                    style={{ fontSize: 50 }}
                  />
                  <span class="ms-3 fw-bold fs-5 text-dark ">
                    All Faculties{" "}
                  </span>
                  <p class="ms-5"></p>
                </div>
              </Paper>
            </Box>
          </div>

          <div class="container-fluid mt-5">
            <MaterialTable
              title={<h4>Faculty Table</h4>}
              columns={columns}
              data={data}
              icons={{
                Delete: () => <DeleteOutline style={{ color: "#FF6347" }} />,
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
                onRowDelete: (oldData) =>
                  new Promise((resolve, reject) => {
                    fetch(
                      "http://localhost:5000/deletefaculty/" +
                        oldData.facultyemail,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-type": "application/json",
                        },
                      }
                    )
                      .then((resp) => resp.json())
                      .then((data) => {
                        if (data.message) {
                          toast.success(data.message, { autoClose: 2500 });
                        }
                        getFaculty();
                        resolve();
                      });
                  }),
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminHome;
