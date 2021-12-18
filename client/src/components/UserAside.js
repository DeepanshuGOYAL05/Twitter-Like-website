import React from "react";
import defaultProfileImg from "../images/default-profile-image.jpg";
import { useSelector } from "react-redux";

const UserAside = () => {
  const currentUser = useSelector((state) => state.currentUser);
  console.log(currentUser);
  return (
    <aside class="card align-left" style={{"width": "15rem"}}>
      <img src="https://picsum.photos/200/150" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{currentUser.user.username}</h5>
        <p class="card-text">
         {currentUser.user.email}
        </p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Followers: {currentUser.user.followers ? currentUser.user.followers.length : 0}</li>
        <li class="list-group-item">Following: {currentUser.user.following ? currentUser.user.following.length : 0}</li>
      </ul>
    </aside>
  );
};
// || defaultProfileImg
export default UserAside;
