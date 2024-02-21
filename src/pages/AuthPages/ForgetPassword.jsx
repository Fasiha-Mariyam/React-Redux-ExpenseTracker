import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useState } from "react";
import EmailField from "../../components/FormFields/EmailField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { forgetPassword } from "../../firebase/AuthFlow/Login";


export default function ForgetPassword() {
    const dispatch = useDispatch();
    const loader = useSelector((state) => state.auth.isLoading);
    const [formData, setFormData] = useState({
      email: ""
    });
  
    const handleChange = (name, value) => {
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("reset clicked");
      
      try {
        console.log(formData.email);
          await forgetPassword(formData.email, dispatch);
          setFormData({
            email: ""
          });
      } catch (error) {}
    };
  
    return (
      <Container
        maxWidth="sm"
        sx={{
          background: "linear-gradient(to bottom right, #f5f5f5, #2196f3)",
          color: "white",
          height: "60vh",
          my: "70px",
          textAlign: "center",
        }}
      >
        <br />
        <h1>Forget Password</h1>
        <form onSubmit={handleSubmit}>
          <EmailField value={formData.email} onChange={handleChange} />
          <br /><br />
          <Button type="submit" variant="contained" color="primary">
            {loader ? <CircularProgress color="inherit" size={24} /> : "Reset"}
          </Button>
        </form>
        <br />
        Back to Login ?
        <Link
          to="/login"
          style={{ textDecoration: "none", marginLeft: 5, color: "black" }}
        >
          <b> Login </b>
        </Link>
      </Container>
    );
  }
  
