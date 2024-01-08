import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes/routes";
import { authService } from "./services/auth/auth.service";
import { Toaster } from "react-hot-toast";

const App = () => {
  const isAuthenticated = localStorage.getItem("authToken");

  return (
    <Router>
      <Header />
      <Routes>
        {publicRoutes.map((route: any, index: any) => (
          <Route
            key={index}
            path={route.path}
            element={<route.component />}
          />
        ))}

        {privateRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={isAuthenticated ? <route.component /> : <Navigate to="/login" />}
          />
        ))}
      </Routes>
      <Footer />
      <Toaster />
    </Router>
  );
};

export default App;
