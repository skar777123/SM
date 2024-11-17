import React, { useEffect, useState } from "react";
import Loader from "../components/Loader.js";

const GetButton = (props) => {
  const [userdetails, setUserdetails] = useState([]);
  const [loading, setLoading] = useState(false);

  async function AddRemove() {
    setLoading(true);
    await fetch("/api/friendsApi/addFriends", {
      method: "POST",
      body: JSON.stringify({ friendId: props.friends._id }),
      headers: { "Content-Type": "application/json" },
    }).catch((error) => {
      return error.message;
    });
    window.location.reload();
  }
  async function userfetcherDetails() {
    await fetch("/api/user/currentUser")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserdetails(data.friends);
      })
      .catch((error) => {
        return error.message;
      });
  }
  useEffect(() => {
    userfetcherDetails();
  },[]);
  return (
    <div>
      {loading && (
        <button className="btn btn-primary" onClick={AddRemove}>
          <Loader />
        </button>
      )}
      {!loading && (
        <button className="btn btn-primary" onClick={AddRemove}>
          {userdetails.includes(props.friends._id)
            ? "Remove Friend"
            : "Add Friend"}
        </button>
      )}
    </div>
  );
};
export default GetButton;
