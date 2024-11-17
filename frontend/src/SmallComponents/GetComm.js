import React, { useEffect, useState } from "react";

const GetComm = (props) => {
  const user = props.user;
  const [comm, setComm] = useState("");
  async function getComments() {
    await fetch("/api/comlike/getComments", {
      method: "POST",
      body: JSON.stringify({ id: props.post._id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setComm(data.comments);
      })
      .catch((error) => {
        return error.message;
      });
  }
  useEffect(() => {
    getComments();
  },[]);

  return (
    <div>
      {comm &&
        user &&
        comm.map((comm, index) => {
          return (
            <div
              className="media mb-3"
              key={index}
              style={{ backgroundColor: "whitesmoke", padding: "10px", borderRadius:"10px",boxShadow:"10px"}}
            >
              <img
                src={user.profilePic}
                className="d-block ui-w-40 rounded-circle"
                alt="no"
              />
              <span className="media-body ml-3">
                {user.username}
                {" commented : "} {comm}
              </span>
            </div>
          );
        })}
    </div>
  );
};
export default GetComm;
