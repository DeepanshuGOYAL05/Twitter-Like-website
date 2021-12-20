import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { apiCall } from "../services/api";
import { useSelector } from "react-redux";

const UsersList = () => {
  const params = useLocation();
  const queryParams = new URLSearchParams(params.search).get("text");
  const currentUser = useSelector(state => state.currentUser);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (queryParams) {
      fetch("/api/auth/users", {
        headers: {
          searchTerm: queryParams,
        },
        method: "GET",
      }).then(async (res) => {
        const response = await res.json();
        setUsers(response.users);
      });
    }
  }, []);

  const followAUser = (user) => {
    const payload = {
      "followingEmail": user.email,
      "followedEmail": currentUser.user.email
    }
    console.log(payload)
    apiCall("POST", "/api/auth/follow", payload).then( async (res) => {
      const response = await res.json();
      console.log(response)
      fetch("/api/auth/users", {
        headers: {
          searchTerm: queryParams,
        },
        method: "GET",
      }).then(async (res) => {
        const response = await res.json();
        setUsers(response.users);
      });
    }).catch(err => {
      console.log(err)
    })
  }

  const checkForUser = (user) => {
    const data = user && user.followers.find(u => u.email === currentUser.user.email)
    return data
  }


  return (
    <div className="container">
      {users.map((user) => (
          <div key={user._id} className="card mb-3" style={{maxWidth: "540px"}}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src="https://picsum.photos/200/300" className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{user.username}</h5>
                <p className="card-text">{user.email}</p>
                {!checkForUser.bind(null, user)() && <button type="button" onClick={followAUser.bind(null, user)} className="btn btn-secondary">Follow</button>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
