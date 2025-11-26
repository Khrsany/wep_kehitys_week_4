// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./views/Layout";
import Home from "./views/Home";
import Upload from "./views/Upload";
import Profile from "./views/Profile";
import Login from "./views/Login";
import Logout from "./views/Logout";
import Single from "./views/Single";

import { UserProvider } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

const basename = import.meta.env.BASE_URL;

export default function App() {
  return (
    <Router basename={basename}>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="upload"
              element={
                <ProtectedRoute>
                  <Upload />
                </ProtectedRoute>
              }
            />

            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="single" element={<Single />} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}
