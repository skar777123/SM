import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import GetButton from "../SmallComponents/GetButton";
import Loader from "../components/Loader";

function AddFriends() {
  const [user, setUser] = useState();
  const [friends, setFriends] = useState();
  const [loading, setLoading] = useState(true);

  async function userfetcher() {
    await fetch("/api/user/currentUserId")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        return error.message;
      });

  }

  async function fetcher() {
    await fetch("/api/friendsApi/getFriends", {
      method: "POST",
      body: JSON.stringify({ id: user }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setFriends(data.otherUsers);
        setLoading(false);
      })
      .catch((error) => {
        return error.message;
      });
  }
  useEffect(() => {
    userfetcher();
    fetcher();
  },[]);

  return (
    <div>
      <Header />
      <div className="mx-5" >
        <div className="row ">
          {loading &&  
          <div className="d-flex justify-content-cednter">
            <Loader />
          </div>
          }
          {!loading &&
            friends &&
            friends.map((friends) => {
              return (
                <div className="col-md-2 my-3">
                  <div className="card" key={friends._id}>
                    <img
                      src={friends.profilePic}
                      className="card-img-top"
                      alt="No Profile "
                    />
                    <div className="card-body ">
                      <h5 className="card-title">{friends.username}</h5>
                      <p className="card-text">{friends.bio}</p>
                      <GetButton friends={friends} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default AddFriends;
