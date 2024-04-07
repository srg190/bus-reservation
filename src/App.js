import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loader from "./components/Loader";
import Dashboard from "./components/Dashboard";
import Index from "./pages/Home";

const Home = React.lazy(() => import("./pages/Home"));
const GlobalLayout = React.lazy(() => import("./styles/global"));

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/booking" element={<Index />} />
          {/* <Route path="/signup" element={<SignUp />} />
          <Route path="/404" element={<Error404 />} />
          <Route path="/500" element={<Error500 />} />
          <Route path="*" element={<GlobalLayout />} /> */}
        </Routes>
      </Router>
    </Suspense>
  );
}
