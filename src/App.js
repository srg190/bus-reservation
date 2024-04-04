import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loader from './components/Loader'

const Home = React.lazy(() => import("./pages/Home"));

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/signup" element={<SignUp />} />
          <Route path="/404" element={<Error404 />} />
          <Route path="/500" element={<Error500 />} />
          <Route path="*" element={<GlobalLayout />} /> */}
        </Routes>
      </Router>
    </Suspense>
  );
}
