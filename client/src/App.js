import React from "react";
import './App.css';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import WelcomePage from './Components/Screens/WelcomePage';
import PageNotfound from "./Components/Screens/PageNotfound";
import StudentLogin from './Authentication/StudentLogin';
import StudentSignup from './Authentication/StudentSignup';
import FacultyLogin from './Authentication/FacultyLogin';
import AdminLogin from './Authentication/AdminLogin';
import AdminHome from './Components/Screens/Admin/AdminHome';
import AddFaculty from './Components/Screens/Admin/AddFaculty';
import ViewReport from './Components/Screens/Admin/ViewReport';
import UploadTopic from './Components/Screens/Faculty/UploadTopic';
import FacultyHome from './Components/Screens/Faculty/FacultyHome';
import ViewReview from './Components/Screens/Faculty/ViewReview';
import Topic from './Components/Screens/Faculty/Topic';
import StudentHome from './Components/Screens/Student/StudentHome';
import ViewComments from './Components/Screens/Student/ViewComments';
import Submisson from './Components/Screens/Student/Submisson';

function App() {

  return (
    <BrowserRouter>
     <Routes>
          <Route path='*' element={<PageNotfound />} />
          <Route path="/plagarismdetection" element={<WelcomePage />}/>
          <Route path="/plagarismdetection/studentlogin" element={<StudentLogin />} />
          <Route path="/plagarismdetection/studentsignup" element={<StudentSignup />} />
          <Route path="/plagarismdetection/facultylogin" element={<FacultyLogin />} />
          <Route path="/plagarismdetection/adminlogin" element={<AdminLogin />} />
          <Route path="/plagarismdetection/adminhome" element={<AdminHome/>} />
          <Route path="/plagarismdetection/addfaculty" element={<AddFaculty />} />
          <Route path="/plagarismdetection/viewreport" element={<ViewReport />} />
          <Route path="/plagarismdetection/uploadtopic" element={<UploadTopic />} />
          <Route path="/plagarismdetection/facultyhome" element={<FacultyHome />} />
          <Route path="/plagarismdetection/viewreview" element={<ViewReview />} />
          <Route path="/plagarismdetection/topic/:id" element={<Topic />} />
          <Route path="/plagarismdetection/studenthome" element={<StudentHome />} />
          <Route path="/plagarismdetection/viewcomments" element={<ViewComments />} />
          <Route path="/plagarismdetection/submisson/:id" element={<Submisson />} />
     </Routes>
    </BrowserRouter>  
    
  );
}

export default App;
