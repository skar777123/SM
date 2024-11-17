import React, { useEffect, useState } from "react";
import Header from "../components/Header.js";
import Likes from "../SmallComponents/Likes.js";
import GetComm from "../SmallComponents/GetComm.js";
import Loader from "../components/Loader.js";

const HomePost = () => {
  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comm, setComm] = useState(false);
  const [show, setShow] = useState(true);

  async function fetcher() {
    await fetch("/api/post/getPost")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setPost(data);
      })
      .catch((error) => {
        return error.message; 
      });
  }
  async function userfetcher() {
    await fetch("/api/user/currentUser")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setUser(data);
      })
      .catch((error) => {
        return error.message;
      });
  }

  function clicked() {
    setShow(false);
    setComm(true);
  }
  function clickedOff() {
    setShow(true);
    setComm(false);
  }

  useEffect(() => {
    fetcher();
    userfetcher();
  }, []);

  return (
    <div>
      <Header />
      {loading && <Loader />}
      {!loading &&
        post &&
        user &&
        post.map((post, index) => {
          async function deletePost() {
            await fetch("/api/post/deletePost", {
              method: "POST",
              body: JSON.stringify({ postId: post._id }),
              headers: { "Content-Type": "application/json" },
            });
            window.location.reload();
          }

          return (
            <div className="d-flex justify-content-center" key={index}>
              <div className="col-lg-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="media mb-3">
                      <img
                        src={user.profilePic}
                        className="d-block ui-w-40 rounded-circle"
                        alt="no"
                      />
                      <div className="media-body ml-3">
                        {user.username}
                        <div className="text-muted small">{post.createdAt}</div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={deletePost}
                      >
                        Delete
                      </button>
                    </div>
                    <p>{post.caption}</p>
                    <div key={post._id}>
                      <img
                        className="ui-rect ui-bg-cover"
                        src={post.image}
                        alt="no"
                      />
                    </div>
                    <Likes post={post} />
                    {!comm && (
                      <button
                        onClick={clicked}
                        className="btn btn-primary my-2"
                        style={{
                          cursor: "pointer",
                          borderRadius: "10px",
                          padding: "5px",
                        }}
                      >
                        Show Comments
                      </button>
                    )}
                    {comm && (
                      <button
                        onClick={clickedOff}
                        className="btn btn-primary my-2"
                        style={{
                          cursor: "pointer",
                          borderRadius: "10px",
                          padding: "5px",
                        }}
                      >
                        Hide comments
                      </button>
                    )}
                    {show && <span />}

                    {!show && <GetComm post={post} user={user} />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
export default HomePost;
