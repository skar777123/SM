import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePost from "./pages/HomePost";
import AddPost from "./pages/AddPost";
import AddFriends from "./pages/AddFriends";
import Profile from "./pages/Profile";
import Chats from "./pages/Chats";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={localStorage.getItem("token") ? <Navigate to="/homePost"/> : <Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/login"
            element={localStorage.getItem("token") ? <Navigate to="/homePost"/> : <Login />}
          />
          <Route exact path="/homePost" element={<HomePost/>}/>
          <Route exact path="/chats" element={<Chats/>}/>
          <Route exact path="/AddPost" element={<AddPost/>}/>
          <Route exact path="/AddFriends" element={<AddFriends/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
