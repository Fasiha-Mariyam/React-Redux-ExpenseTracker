import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useState } from "react";
import PasswordField from "../../components/FormFields/PasswordField";
import EmailField from "../../components/FormFields/EmailField";
import NameField from "../../components/FormFields/NameField";
import { SignUp } from "../../firebase/AuthFlow/Signup";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";

export default function Signup() {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.auth.isLoading);
  console.log(loader);
  const [formData, setFormData] = useState({
    name: "",
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
        await SignUp(
          formData.email,
          formData.password,
          formData.name,
          dispatch
        );
        await Swal.fire({
          icon: "success",
          title: "User Created Successfully!",
          text: "The user has been successfully created. Thank you for signing up!",
          confirmButtonColor: "#3085d6",
        });
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      } else {
        Swal.fire("Password Must Be Greater Than 6 Letters!");
      }
    } catch (error ) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        background: "linear-gradient(to bottom right, #f5f5f5, #2196f3)",
        color: "white",
        height: "80vh",
        my: "50px",
        textAlign: "center",
      }}
    >
      <br />
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <NameField value={formData.name} onChange={handleChange} />
        <br />
        <EmailField value={formData.email} onChange={handleChange} />
        <br />
        <PasswordField value={formData.password} onChange={handleChange} />
        <br /> <br />
        <Button type="submit" variant="contained" color="primary">
          {loader ? <CircularProgress color="inherit" size={24} /> : "Signup"}
        </Button>
      </form>
      <br />
      Already have an account?
      <Link
        to="/login"
        style={{ textDecoration: "none", marginLeft: 5, color: "black" }}
      >
        <b> Log in here.</b>
      </Link>
    </Container>
  );
}
