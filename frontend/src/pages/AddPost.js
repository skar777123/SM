import { useState } from "react";
import Header from "../components/Header.js";
import Loader from "../components/Loader.js";

export default function AddPost() {
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "SMA_image_bank");
    data.append("cloud_name", "dapajcd1d");
    try {
      if (image === null) {
        return error.message;
      }

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dapajcd1d/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const cloudData = await res.json();
    const addPost = { image: cloudData.url, caption };
    const response = await fetch("/api/post/createPost", {
      method: "POST",
      body: JSON.stringify(addPost),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setImage("");
      setCaption("");
      window.location.href = "/homePost";
    }
  }
  catch(error){
    setError("Something went wrong, please try again later.")
  }
  }
  
  
  
  return (
    <div>
      <Header />

      <div className="d-flex justify-content-center my-5">
        <form>
          <h2 className="mx-4" style={{ color: "whitesmoke" }}>
            Add Post:
          </h2>
          <div>
            <label className="mx-4" style={{ color: "whitesmoke" }}>
              Image:
            </label>
            <input
              style={{ color: "whitesmoke" }}
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div>
            <label className="mx-4" style={{ color: "whitesmoke" }}>
              Caption:
            </label>
            <input
              type="text"
              value={caption}
              placeholder="Caption..."
              onChange={(e) => setCaption(e.target.value)}
              style={{ borderRadius: "10px", padding: "5px" }}
            />
          </div>
          <div>
            <input
              className="btn btn-primary my-2 mx-3"
              style={{ borderRadius: "10px", padding: "5px" }}
              type="submit"
              value="Add Post"
              onClick={handleSubmit}
            />
          </div>
          {loading && <Loader />}
        </form>
      </div>
    </div>
  );

}
