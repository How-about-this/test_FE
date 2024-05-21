import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OAuth2RedirectHandler = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const accessToken = query.get("access_token");

    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
      setIsAuthenticated(true);
      navigate("/");
    }
  }, [location, navigate, setIsAuthenticated]);

  return <div>로딩 중...</div>;
};

export default OAuth2RedirectHandler;
