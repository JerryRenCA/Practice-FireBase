import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { ReactElement, useContext } from "react";
import Login from "./pages/login/Login";
import Home from "./pages/main/Home";
import { AuthContext } from "./contexts/AuthContext";
import New from "./pages/new/New";
import { newUserFields } from "./pages/new/newFields";
function App() {
  const authContext=useContext(AuthContext)

  const RequireAuth = ({ children }: { children: ReactElement }) => {
    return authContext.state.isLogin ? children : <Navigate to="/login" />;
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={ <RequireAuth><Home/></RequireAuth> }/>
            <Route path="login" element={<Login />} />
            <Route path="new" element={<New newUserFields={newUserFields}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
