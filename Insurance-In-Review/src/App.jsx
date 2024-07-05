import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// Pages here
import Home from "./pages/Home";
import Policy from "./pages/Policy";
import ViewReport from "./pages/ViewReport";
import Report from "./pages/Report";
import AboutUs from "./pages/AboutUs";
import Help from "./pages/Help";
import Login from "./pages/Login";
import Account from "./pages/Account";

// Components here
import Navbar from "./components/Navbar";
import NavbarDark from "./components/NavbarDark";
import Footer from "./components/Footer";
import FooterDark from "./components/FooterDark";
import FooterBannerDark from "./components/FooterBannerDark";
import FooterBanner from "./components/FooterBanner";


const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <FooterBanner />
      <Footer />
    </div>
  );
};

const DarkTheme = () => {
  return (
    <div>
      <NavbarDark />
      <Outlet />
      <FooterBannerDark />
      <FooterDark />
    </div>
  );
};

const ReportFooter = () => {
  return (
    <div>
      <Outlet />
      <FooterBannerDark />
      <FooterDark />
    </div>
  );
};

const router = createBrowserRouter([
  // Dashboard for All Pages
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/your-policy",
        element: <Policy />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },

  // Dark mode for Report Pages
  {
    path: "/",
    element: <DarkTheme />,
    children: [
      {
        path: "/view-report",
        element: <ViewReport />,
      },
    ],
  },

  // Footer for Report Page
  {
    path: "/",
    element: <ReportFooter />,
    children: [
      {
        path: "/report",
        element: <Report />,
      },
    ],
  },

  // Routes
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/your-policy",
    element: <Policy />,
  },
  {
    path: "/view-report",
    element: <ViewReport />,
  },
  {
    path: "/report",
    element: <Report />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/help",
    element: <Help />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/account",
    element: <Account />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
