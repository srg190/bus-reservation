import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loader from "./components/Loader";

const Booking = React.lazy(() => import("./pages/Booking"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Navbar = React.lazy(() => import("./components/Navbar"));

export default function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/seat-booking" element={<Booking />} />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}
