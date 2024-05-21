import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // API의 기본 URL 설정
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 전에 토큰을 헤더에 추가하는 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// GET 요청 메서드
export const getData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch data from ${endpoint}:`, error);
    throw error;
  }
};

// POST 요청 메서드
export const postData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to post data to ${endpoint}:`, error);
    throw error;
  }
};

export default api;
