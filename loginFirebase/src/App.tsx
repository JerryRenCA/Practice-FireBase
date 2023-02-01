import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { ReactElement, useContext } from "react";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import { AuthContext } from "./contexts/AuthContext";
function App() {
  const authContext=useContext(AuthContext)

  const RequireAuth = ({ children }: { children: ReactElement }) => {
    return authContext.currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={ <RequireAuth><Main/></RequireAuth> }/>
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
