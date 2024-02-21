import {
  Container,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import NameField from "../../../components/FormFields/NameField";
import CategoryList from "../../../components/MoreButton/List";
import { addCategories } from "../../../firebase/Category";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function AddCategory() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState([]);
  const reduxCategories = useSelector((state) => state.category.categories);
  const Loader = useSelector((state) => state.category.isLoading);
  const [categoryName, setCategoryName] = useState({ name: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    setCategory(reduxCategories);
  }, [reduxCategories]);

  const handleChange = (field, value) => {
    setCategoryName({
      ...categoryName,
      [field]: value,
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleAddCategory = () => {
    if (categoryName.name === "") {
      setSnackbarMessage('Please fill the input field first.');
      setSnackbarOpen(true);
    } else if (category.some(cat => cat.data.categoryName.toLowerCase() === categoryName.name.toLowerCase())) {
      setSnackbarMessage('Category name already exists.');
      setSnackbarOpen(true);
    } else {
      addCategories(categoryName.name, dispatch);
      setCategoryName({ name: "" });
    }
  };

  return (
    <>
      <Typography variant="h4" sx={{ fontWeight: "bold", m: 2 }}>
        Add Category
      </Typography>
      <Container sx={{ display: "flex" }}>
        <Container sx={{ width: "100%" }}>
          <NameField
            label={"Add Category"}
            value={categoryName.name}
            onChange={handleChange}
          />
        </Container>
        <Button variant="contained" onClick={handleAddCategory}>
          Add
        </Button>
      </Container>
      <br />
      {/* All Category */}
      {Loader ? (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <CircularProgress />
        </Container>
      ) : (
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            width: "100%",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          {category.map((category) => (
            <CategoryList
              key={category.id}
              category={category.data}
              id={category.id}
              value={
                category.data.categoryName === "Home" ||
                category.data.categoryName === "Shopping" ||
                category.data.categoryName === "Medical"
                  ? "Default"
                  : "Added Category"
              }
              deleteBtn={
                category.data.categoryName !== "Home" &&
                category.data.categoryName !== "Shopping" &&
                category.data.categoryName !== "Medical"
              }
              sx={{
                flex: "0 0 calc(33.33% - 4px)",
                mb: 2,
              }}
            />
          ))}
        </Container>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <MuiAlert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
}
