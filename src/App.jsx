
import { Routes, Route } from "react-router-dom";

import { ProtectedLoginRoute, ProtectedRoutes } from "../src/utils/ProtectedRoutes";
import DashboardLogin from "../src/pages/Login/DashboardLogin"
import DashboardCreateUser from "../src/pages/CreateUser/DashboardCreateUser"
import DashboardHome from "../src/pages/Home/DashboardHome"
import DashboardNewBlog from "../src/pages/AddNewBlog/DashboardNewBlog"
import DashboardBlog from "../src/pages/Blog/DashboardBlog"
import DashboardUsers from "../src/pages/Users/DashboardUsers";

function App() {


  return (
    <Routes>
      <Route element={<ProtectedLoginRoute />}>
        <Route path="/" element={<DashboardLogin />} />
        <Route path="/createUser" element={<DashboardCreateUser />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/home" element={<DashboardHome />} />
        <Route path="/add-new-blog" element={<DashboardNewBlog />} />
        <Route path="/blog" element={<DashboardBlog />} />
        <Route path="/users" element={<DashboardUsers />} />
      </Route>
    </Routes>
  );
}

export default App
