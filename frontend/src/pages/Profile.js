import React, { useEffect, useState } from "react";
import Header from "../components/Header.js";
import Loader from "../components/Loader.js";

function Profile() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  async function userfetcher() {
    await fetch("/api/user/currentUser")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((error) => {
        return error.message;
      });
  }

  useEffect(() => {
    userfetcher();
  },[]);
  return (
    <div>
      <Header />
      {loading && <Loader />}
      {!loading && (
        <div className="container mt-5 mb-5">
          <div className="row no-gutters">
            <div className="col-md-4 col-lg-4">
              <img src={user.profilePic} alt={''} />
            </div>
            <div className="col-md-8 col-lg-8">
              <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                  <h3 className="display-5"> {user.username} </h3>
                </div>
                <div className="p-3 bg-black text-white">
                  <h6> {user.bio} </h6>
                </div>
                <div className="d-flex flex-row text-white">
                  <div className="p-4 bg-primary text-center skill-block">
                    <h4>Friends</h4>
                    <h6>{user.friends?.length}</h6>
                  </div>
                  <div className="p-3 bg-success text-center skill-block">
                    <h4>Posts</h4>
                    <h6>{user.post?.length}</h6>
                  </div>
                  <div className="p-3 bg-warning text-center skill-block">
                    <h4>Email</h4>
                    <h6>{user.email}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
