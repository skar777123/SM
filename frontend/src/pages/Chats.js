import React, { useState } from "react";
import Header from "../components/Header";
import Loader from "../components/Loader";
function Chats() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(true);
  const [loader, setLoader] = useState(true);
  const [fetched, setFetch] = useState([]);
  const [message, setMessage] = useState([]);
  const [id, setId] = useState([]);
  const [sender, setSender] = useState([]);

  async function userfetcher() {
    await fetch("/api/user/addedFriends")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data.friends);
        setLoading(false);
      })
      .catch((error) => {
        return error.message;
      });
  }
  userfetcher();

  async function sendMessage() {
    setLoad(true);
    await fetch("/api/chat/send-message", {
      method: "POST",
      body: JSON.stringify({
        message: message,
        id: id,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setLoader(true);
        setMessage("");
      })
      .catch((error) => {
        return error.message;
      });
  }
  return (
    <div>
      <Header />
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
            <div className="card">
              <div className="card-body">
                <h5 className="font-weight-bold mb-3 text-center text-lg-start">
                  Freinds:
                </h5>
                <ul className="list-unstyled mb-0">
                  {loading && <Loader />}
                  {!loading &&
                    user &&
                    user.map((user, index) => {
                      async function messageFetch() {
                        setId(user._id);
                        setSender(user.username);
                        setLoad(true);
                        await fetch("/api/chat/get-message", {
                          method: "POST",
                          body: JSON.stringify({
                            id: user._id,
                          }),
                          headers: { "Content-Type": "application/json" },
                        })
                          .then((res) => {
                            return res.json();
                          })
                          .then((data) => {
                            setFetch(data);
                            setLoad(false);
                          })
                          .catch((error) => {
                            return error.message;
                          });
                      }

                      return (
                        <li
                          className="p-2 border-bottom bg-body-tertiary"
                          key={index}
                        >
                          <div className="d-flex ">
                            <img
                              src={user.profilePic}
                              alt="avatar"
                              className="me-3 rounded-circle align-self-center "
                              id="imgChats"
                            />
                            <div className="pt-1">
                              <span
                                onClick={messageFetch}
                                className="fw-bold mb-0"
                                style={{
                                  cursor: "pointer",
                                }}
                              >
                                {user.username}
                              </span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
          <div className="card w-50">
            <div className="card-body">
              <h5 className=" font-weight-bold mb-3 text-center text-lg-start">
                Message:
              </h5>
              {loader && setLoader(false) && setLoad(false)}
              {!loader && load && (
                <h5 className="d-flex justify-content-center">
                  Tap on User to Chat
                </h5>
              )}
              {!loader &&
                !load &&
                fetched &&
                fetched.map((fetched) => {
                  return (
                    <div>
                      <div
                        className="container-fluid d-flex mb-3 "
                        key={fetched.createdAt}
                      >
                        {fetched.receiverId === id ? (
                          <div className="overflow-auto ">
                            <div
                              className="row  d-flex justify-content-end"
                              style={{ marginLeft: "250px" }}
                            >
                              <div className="col-10">
                                <div className="d-flex flex-column ">
                                  <span
                                    className="fw-bold mb-1 "
                                    style={{
                                      backgroundColor: "blueviolet",
                                      color: "white",
                                      padding: "5px",
                                      borderRadius: "10px",
                                      width: "80px",
                                    }}
                                  >
                                    {fetched.message}
                                  </span>
                                  <span
                                    className="fw-bold mb-1 "
                                    style={{
                                      color: "gray",
                                      fontSize: "10px",
                                      marginLeft: "10px",
                                    }}
                                  >
                                    to {sender}
                                  </span>
                                  <span
                                    className="fw-bold mb-1 "
                                    style={{
                                      color: "gray",
                                      fontSize: "10px",
                                      marginLeft: "10px",
                                    }}
                                  >
                                    {fetched.createdAt.slice(0, 10)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="row d-flex justify-content-start"
                            style={{ marginLeft: "50px" }}
                          >
                            <div className="col-10">
                              <div className="d-flex flex-column">
                                <span
                                  className="fw-bold mb-1 "
                                  style={{
                                    backgroundColor: "blue",
                                    color: "white",
                                    padding: "5px",
                                    borderRadius: "10px",
                                    width: "80px",
                                  }}
                                >
                                  {fetched.message}
                                </span>
                                <span
                                  className="fw-bold mb-1"
                                  style={{
                                    color: "gray",
                                    fontSize: "10px",
                                    marginLeft: "10px",
                                  }}
                                >
                                  to You
                                </span>
                                <span
                                  className="fw-bold mb-1 "
                                  style={{
                                    color: "gray",
                                    fontSize: "10px",
                                    marginLeft: "10px",
                                  }}
                                >
                                  {fetched.createdAt.slice(0, 10)}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              {load && <span />}
              {!load && (
                <div className="d-flex justify-lg-center align-self-end">
                  <textarea
                    rows={4}
                    cols={55}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      borderRadius: "20px",
                      padding: "10px",
                    }}
                  />
                  <form>
                    <span
                      onClick={sendMessage}
                      style={{
                        marginLeft: "20px",
                        color: "white",
                        fontSize: "20px",
                        padding: "10px",
                        borderRadius: "15px",
                        borderColor: "blueviolet",
                        backgroundColor: "blueviolet",
                        cursor: "pointer",
                      }}
                    >
                      Send
                    </span>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chats;
