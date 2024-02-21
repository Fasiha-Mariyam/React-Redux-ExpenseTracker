import Container from "@mui/material/Container";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import PasswordField from "../../components/FormFields/PasswordField";
import EmailField from "../../components/FormFields/EmailField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import { LogIn } from "../../firebase/AuthFlow/Login";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loader = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.hasError);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password.length > 6) {
        await LogIn(formData.email, formData.password, dispatch, navigate);
        setFormData({
          email: "",
          password: "",
        });
      } else {
        Swal.fire("Password Must Be Greater Than 6 Letters!");
      }
    } catch (error) {}
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        background: "linear-gradient(to bottom right, #f5f5f5, #2196f3)",
        color: "white",
        height: "80vh",
        my: "70px",
        textAlign: "center",
      }}
    >
      <br />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <EmailField value={formData.email} onChange={handleChange} />
        <br /> <br />
        <PasswordField value={formData.password} onChange={handleChange} />
        <br /> <br />
        <Button type="submit" variant="contained" color="primary">
          {loader ? <CircularProgress color="inherit" size={24} /> : "Login"}
        </Button>
      </form>
      <br />
      New to our platform?
      <Link
        to="/"
        style={{ textDecoration: "none", marginLeft: 5, color: "black" }}
      >
        <b> Sign up now!</b>
      </Link>
      <br /><br />
      <Link
        to="/forgetPassword"
        style={{ textDecoration: "none", marginLeft: 5, color: "black" }}
      >
        <b> Forget Password?</b>
      </Link>
    </Container>
  );
}
