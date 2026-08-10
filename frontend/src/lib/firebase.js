// Authentication helper functions using the backend API instead of Firebase Auth

let authCallbacks = [];

// Helper to notify listeners of auth changes
const notifyAuthChange = (user) => {
  authCallbacks.forEach(cb => cb(user));
};

export const loginAdmin = async (email, password) => {
  const backendUrl = (typeof process !== "undefined" && process.env && process.env.REACT_APP_BACKEND_URL) || "";
  const url = backendUrl ? `${backendUrl}/api` : "/api";
  
  const res = await fetch(`${url}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  
  if (!res.ok) {
    throw new Error("E-mail ou senha incorretos.");
  }
  
  const data = await res.json();
  localStorage.setItem("matriel_admin_token", data.token);
  localStorage.setItem("matriel_admin_email", data.email);
  
  const user = { email: data.email, uid: "admin-uid" };
  notifyAuthChange(user);
  return user;
};

export const logoutAdmin = async () => {
  localStorage.removeItem("matriel_admin_token");
  localStorage.removeItem("matriel_admin_email");
  notifyAuthChange(null);
};

export const subscribeToAuthChanges = (callback) => {
  authCallbacks.push(callback);
  
  // Call immediately with current state
  const localEmail = localStorage.getItem("matriel_admin_email");
  const localToken = localStorage.getItem("matriel_admin_token");
  if (localEmail && localToken) {
    callback({ email: localEmail, uid: "admin-uid" });
  } else {
    callback(null);
  }
  
  return () => {
    authCallbacks = authCallbacks.filter(cb => cb !== callback);
  };
};

export const getAuthToken = async () => {
  return localStorage.getItem("matriel_admin_token");
};

