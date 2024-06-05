import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import OAuth2RedirectHandler from "./handler/OAuth2RedirectHandler";
import WeatherComponent from "./components/WeatherComponent";
import WeatherPage from "./pages/WeatherPage";

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
        <Route
          path="/weather"
          element={
            <WeatherPage />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
