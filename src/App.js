import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Feed from "./pages/Feed/Feed";
import Profile from "./pages/Profile/Profile";
import Discover from "./pages/Discover/Discover";
import Events from "./pages/Events/Events";
import axios from "axios";
import { useEffect, useState } from "react";
import SinglePost from "./componenets/SinglePost/SinglePost";
import ViewProfile from "./pages/ViewProfile/ViewProfile";

function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/get-session`
        );

        console.log(data);

        setSession(data);

        const newProfile = {
          spotify_id: data.sessionProfile.id,
          user_name: data.sessionProfile.display_name,
        };

        setProfile(newProfile);
      } catch (err) {
        console.log(err);
      }
    };

    getSession();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/feed"
            element={<Feed session={session} profile={profile} />}
          />
          <Route
            path="/profile"
            element={<Profile session={session} profile={profile} />}
          />
          <Route
            path="/profile/:id"
            element={<ViewProfile session={session} profile={profile} />}
          />
          <Route path="/discover" element={<Discover />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
