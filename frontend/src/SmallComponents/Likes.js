import React, { useState } from "react";
import Loader from "../components/Loader";

function Likes(props) {
  const [comment, setComment] = useState();
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [liker, setLiker] = useState(false);

  function reload() {
    window.location.reload();
  }

  async function likesFetch() {
    setLiker(true);
    const res = await fetch("/api/comlike/likes", {
      method: "POST",
      body: JSON.stringify({ id: props.post._id }),
      headers: { "Content-Type": "application/json" },
    }).catch((error) => {
      return error.message;
    });
    if (res.ok) {
      setLiker(false);
      reload();
    }
  }
  const commentsFetch = async (e) => {
    setLoader(true);
    e.preventDefault();
    const response = await fetch("/api/comlike/comment", {
      method: "POST",
      body: JSON.stringify({ id: props.post._id, comment: comment }),
      headers: { "Content-Type": "application/json" },
    }).catch((error) => {
      return error.message;
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      alert(error);
    }
    if (response.ok) {
      setComment("");
      console.log("new comment added ", json);
      setLoader(false);
    }
  };

  return (
    <div>
      <div>
        {liker && (
          <button
            className="btn btn-primary my-2"
            style={{ cursor: "pointer", borderRadius: "10px", padding: "5px" }}
          >
            <Loader />
          </button>
        )}
        {!liker && (
          <button
            className="btn btn-primary my-2"
            style={{ cursor: "pointer", borderRadius: "10px", padding: "5px" }}
            onClick={likesFetch}
          >
            {"Likes: "}
            {props.post.likes.length}
          </button>
        )}
      </div>
     
        {loader && <Loader />}
        {!loader && (
          <form onSubmit={commentsFetch}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ borderRadius: "10px", padding: "5px", width: "300px" }}
            />
            <input
              className="btn btn-primary mx-1"
              style={{
                cursor: "pointer",
                borderRadius: "10px",
                padding: "5px",
              }}
              type="submit"
              value="Comment"
            />
          </form>
        )}
    </div>
  );
}

export default Likes;
