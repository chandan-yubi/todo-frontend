import Homepage from "../pages/Homepage/Homepage";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";
import Task from "../pages/Tasks/Task";

export const publicRoutes = [
  { path: "/", component: Homepage, restricted: false },
  { path: "/login", component: Login, restricted: true },
  { path: "/register", component: Register, restricted: true },
];

export const privateRoutes = [
  { path: "/my-tasks", component: Task },
  { path: "/profile", component: Profile },
];
