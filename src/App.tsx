import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
const Home = React.lazy(() => import("./pages/Home").then(({ Home }) => ({ default: Home })));
const Dice = React.lazy(() => import("./pages/Dice").then(({ Dice }) => ({ default: Dice })));
const Mines = React.lazy(() => import("./pages/Mines").then(({ Mines }) => ({ default: Mines })));

function App() {
  return(
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <Suspense fallback={<h2>Loading Home...</h2>}>
            <Home />
          </Suspense>
        } />
        <Route path="/dice" element={
          <Suspense fallback={<h2>Loading Dice...</h2>}>
            <Dice />
          </Suspense>
        } />
        <Route path="/mines" element={
          <Suspense fallback={<h2>Loading Mines...</h2>}>
            <Mines />
          </Suspense>
        } />
        <Route path="*" element={<h2>404: Page Not Found</h2>} />
      </Routes>
    </Router>
  )
}

export default App;