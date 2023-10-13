import "./App.css";
import React, { useState } from "react";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import User from "./page/User";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard/"
          element={
            <ProtectedRoute>
              <Dashboard
                setLoggedInUser={setLoggedInUser}
                loggedInUser={loggedInUser}
              />
            </ProtectedRoute>
          }
        >
          <Route
            path="user"
            element={loggedInUser?.isAdmin === true ? <User /> : <Login />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
