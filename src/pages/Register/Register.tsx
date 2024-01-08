import React from "react";
import "./Register.css";
import { useFormik } from "formik";
import { authService } from "../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      console.log("Submitted", values);
      authService.registerUser(values.name, values.email, values.password).then(
        (response) => {
          localStorage.setItem("authToken", response.access_token);
          navigate("/my-tasks");
        }
      ).catch((err) => {
        console.log("Register Error Response", err)
      })
    },
    validate: (values) => {
      let errors: any = {};
      if (!values.name) {
        errors.name = "Required";
      }
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
      } else if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Password not matched";
      }
      return errors;
    },
  });
  return (
    <div className="register-page">
      <div className="register-container">
        <h2>Create Your Account</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="register-form">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name ? <div className = 'error'>{formik.errors.name}</div> : null}
          </div>

          <div className="register-form">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email ? <div className = 'error'>{formik.errors.email}</div> : null}
          </div>

          <div className="register-form">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password ? (
              <div className = 'error'>{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="register-form">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
            />
            {formik.errors.confirmPassword ? (
              <div className = 'error'>{formik.errors.confirmPassword}</div>
            ) : null}
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
