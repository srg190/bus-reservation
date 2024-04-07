import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loader from "./components/Loader";
// import Dashboard from "./components/Dashboard";

const Home = React.lazy(() => import("./pages/Home"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const Navbar = React.lazy(() => import("./components/Navbar"));

export default function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/seat-booking" element={<Home />} />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}
