import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

export default api;

// REGISTER
export const registerUser = async (userDetails) => {
  try {
    const { data } = await api.post("/users", userDetails);
    return data;
  } catch (error) {
    throw error;
  }
};

// LOGIN
export const loginUser = async (email, password) => {
  try {
    const { data } = await api.post("/users/login", {
      email,
      password,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

// AUTHENTICATE SESSION
export const authenticateUser = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const response = await api.get("/users/authenticate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.user;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        handleInvalidToken();
      } else {
        localStorage.removeItem("token");
        console.error("An error occurred during authentication:", error);
      }
      return null;
    }
  }

  return null;
};

// LOGOUT
export const logout = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    await api.post("/users/logout", {});

    localStorage.removeItem("token");
  }
};
