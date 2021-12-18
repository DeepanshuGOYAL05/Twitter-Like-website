import axios from "axios";

export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    return fetch(path, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.jwtToken ? `Bearer ${localStorage.jwtToken}` : undefined,
      },
      method: method || "GET",
      body: JSON.stringify(data) || undefined,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
