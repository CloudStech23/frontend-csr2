import "./App.css";
// import Main from "./Components/Main/Main";
import React, { lazy, Suspense } from "react";

const Main = lazy(() => import("./Components/Main/Main"));

function App() {
  return (
    <Suspense className="App" fallback={<div>Loading...</div>}>
      <Main />
    </Suspense>
  );
}

export default App;
