import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import OAuth2RedirectHandler from "./handler/OAuth2RedirectHandler";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path="/oauth2/redirect"
          element={
            <OAuth2RedirectHandler setIsAuthenticated={setIsAuthenticated} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
