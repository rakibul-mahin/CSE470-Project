import Home from "./screens/Home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import { useSelector } from "react-redux";

const App = () => {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={user === null ? <Navigate to={"/login"} /> : <Home />}
          ></Route>
          <Route
            path='/login'
            element={user !== null ? <Navigate to={"/"} /> : <Login />}
          ></Route>
          <Route
            path='/register'
            element={user !== null ? <Navigate to={"/"} /> : <Register />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
