import React, { useEffect, useState } from "react";
import { getData } from "../api/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MainPage = ({ isAuthenticated, setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUser = async () => {
        try {
          const userData = await getData("/user/current");
          setUser(userData.data); // ApiResponse의 data 필드 사용
        } catch (error) {
          console.error("Error fetching user data:", error);
          setIsAuthenticated(false); // 인증 실패 시 상태 업데이트
        }
      };
      fetchUser();
    }
  }, [isAuthenticated, setIsAuthenticated]);

  const handleLoginCheck = () => {
    window.location.href = "api/oauth2/authorization/kakao";
  };

  const handleWeather = () => {
    navigate("/weather");
  }

  const handleRedirectButton = async (e) => {
    e.preventDefault();
    const response = await apiWithoutToken.get("/redirect");
  }

  const apiWithoutToken = axios.create({
    baseURL: "/api", // API의 기본 URL 설정
    headers: {
      "Content-Type": "application/json",
    },
  });
  

  if (!isAuthenticated) {
    return (
      <div>
        <h1>메인 페이지</h1>
        <img
          src={`${process.env.PUBLIC_URL}/kakao_login_medium_narrow.png`}
          alt="Kakao Login"
          onClick={handleLoginCheck}
          style={{ cursor: "pointer" }}
        />
        <div>
          <button onClick={handleWeather}>날씨 페이지</button>
        </div>
        <div>
          <button onClick={handleRedirectButton}>리다이렉트 버튼</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>메인 페이지</h1>
      <img
        src={`${process.env.PUBLIC_URL}/kakao_login_medium_narrow.png`}
        alt="Kakao Login"
        onClick={handleLoginCheck}
        style={{ cursor: "pointer" }}
      />
      {user ? (
        <div>
          <h2>사용자 정보</h2>
          <p>Username: {user.username}</p>
          <p>Name: {user.name}</p>
          <p>Role: {user.role}</p>
          <p>Status: {user.status}</p>
          {user.profileImage && <img src={user.profileImage} alt="Profile" />}
        </div>
      ) : (
        <p>사용자 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default MainPage;
