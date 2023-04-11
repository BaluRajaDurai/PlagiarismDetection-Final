import undraw_notfound from "../../Assets/undraw_notfound.svg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PageNotfound = () => {
  function redirect() {
    navigate("/plagarismdetection");
  }

  let navigate = useNavigate();

  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col-6 mt-5">
          <img
            src={undraw_notfound}
            height={600}
            alt="welcome"
            style={{ position: "absolute", marginLeft: "6%" }}
          />
        </div>
        <div class="col-6 mt-5 ">
          <div
            class="mt-5 "
            style={{ position: "absolute", marginLeft: "15%", top: "20%" }}
          >
            <h1 class="fw-bolder mt-5 mb-2" style={{ color: "#6C63FF" }}>
              Access Denied
            </h1>
            <p class="text-secondary">
              You don't have permisson to access requested page...
            </p>
            <Button
              variant="contained"
              onClick={redirect}
              color="error"
              style={{ fontWeight: 600 }}
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotfound;
