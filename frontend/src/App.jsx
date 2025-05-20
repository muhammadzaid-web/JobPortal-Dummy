import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "./page/Home";
import Jobs from "./page/Jobs";
import Browse from "./page/Browse";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Profile from "./page/Profile";
import AOS from "aos";
import "aos/dist/aos.css";
import JobDescription from "./page/JobDescription ";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/adminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoutes from "./components/admin/ProtectedRoutes";
import Toast from "./components/shared/Toast";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 900, // Animation duration in ms
      easing: "ease-in-out",
      once: true, // Whether animation should happen only once while scrolling down
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
    {
      path: "/jobs",
      element: <Jobs />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/description/:id",
      element: <JobDescription />,
    },
    //admin path
    {
      path: "/admin/companies",
      element: (
        <ProtectedRoutes>
          <Companies />
        </ProtectedRoutes>
      ),
    },
    {
      path: "/admin/companies/create",
      element: (
        <ProtectedRoutes>
          <CompanyCreate />
        </ProtectedRoutes>
      ),
    },
    {
      path: "/admin/company/:id",
      element: (
        <ProtectedRoutes>
          <CompanySetup />
        </ProtectedRoutes>
      ),
    },
    {
      path: "/admin/jobs",
      element: (
        <ProtectedRoutes>
          <AdminJobs />
        </ProtectedRoutes>
      ),
    },
    {
      path: "/admin/jobs/create",
      element: (
        <ProtectedRoutes>
          <PostJob />
        </ProtectedRoutes>
      ),
    },
    {
      path: "/admin/jobs/:id/applicants",
      element: (
        <ProtectedRoutes>
          <Applicants />
        </ProtectedRoutes>
      ),
    },
  ]);

  return (
    <>
      <div>
        <RouterProvider router={router}>
        </RouterProvider>
          <Toast/>
      </div>
    </>
  );
}

export default App;
