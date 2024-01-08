import { useState } from "react";
import "./Login.css";
import { useFormik } from "formik";
import { LoginData } from "../../models/LoginData";
import { authService } from "../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const initialValues: LoginData = {
  email: "",
  password: "",
};

const validate = (values: LoginData) => {
  let errors: LoginData = {
    email: "",
    password: "",
  };

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};

const Login = () => {
  // const { styleConnector } = useStyles()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      setLoading(true);
      console.log("Submitted", values);
      authService
        .login(values.email, values.password)
        .then((response) => {
          localStorage.setItem("authToken", response.access_token);
          navigate("/my-tasks");
          setLoading(false);
          toast.success('Successfully Logged in!');
        })
        .catch((err) => {
          console.log("Login Error Response", err);
          toast.error('Invalid credentials!');
          setLoading(false);
        });
    },
  });

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login to Your Account</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="login-form">
            {/* <Input id="inpId" styleConnector={styleConnector} /> */}
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <div className="error">
              {formik.errors.email ? formik.errors.email : null}
            </div>
          </div>
          <div className="login-form">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <div className="error">
              {formik.errors.password ? formik.errors.password : null}
            </div>
          </div>
          <div className="login-form">
            <button type="submit">{loading ? "Loading..." : "Login"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
