import React, { useEffect, useState } from "react";
import { Box, Button, TextField, FormLabel } from "@mui/material";
import NumberField from "../../../components/FormFields/NumberField";
import Selected from "../../../components/FormFields/Selected";
import RadioBtn from "../../../components/FormFields/RadioBtn";
import { useDispatch, useSelector } from "react-redux";
import { addTransactions } from "../../../firebase/Transaction";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { updateAccountAmount } from "../../../firebase/Account";

export default function AddTransaction() {
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const reduxCategories = useSelector((state) => state.category.categories);
  const reduxAccounts = useSelector((state) => state.account.account);
  // useEffect states
  const [accounts, setAccounts] = useState([]);
  const [category, setCategory] = useState([]);
  // getting values from components
  const [categoryValue, setCategoryValue] = useState(0);
  const [accountValue, setAccountValue] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [amount, setAmount] = useState({ amount: "" });
  // date state
  const [dateValue, setDateValue] = useState("");
  
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const handleChange = (field, value) => {
    setAmount({
      ...amount,
      [field]: value,
    });
  };

  const handleSelectAccountChange = (value) => {
    setAccountValue(value);
  };

  const handleSelectCategoryChange = (value) => {
    setCategoryValue(value);
  };

  const handleRadioChange = (value) => {
    setSelectedMethod(value);
  };

  useEffect(() => {
    const categoryNames = reduxCategories.map(
      (category) => category.data.categoryName
    );
    const accountNames = reduxAccounts.map(
      (account) => account.data.accountName
    );
    setCategory(categoryNames);
    setAccounts(accountNames);
  }, []);

  async function handleAddTransactions() {
    let payload = null;
  
    if (amount.amount === "" || accountValue === "" || dateValue === "") {
      console.log("Fill All the Required Fields First");
      setSnackbarMessage("Fill All the Required Fields First");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
  
    if (selectedMethod === "") {
      setSnackbarMessage("Select Method To Proceed");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
  
    if (selectedMethod === "Expense" && categoryValue === "") {
      console.log("Fill Category Field for Expense");
      setSnackbarMessage("Fill Category Field for Expense");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
  
    const updateSuccess = await updateAccountAmount(accountValue, amount.amount, selectedMethod, dispatch);
    console.log(updateSuccess);
    if (!updateSuccess) {
      // If update failed due to insufficient balance
      setSnackbarMessage("Insufficient balance to make the transaction");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
  
    if (selectedMethod === "Income") {
      payload = {
        type: selectedMethod,
        amount: amount.amount,
        category: "Money Received",
        account: accountValue,
        date: dateValue,
      };
    } else {
      payload = {
        type: selectedMethod,
        amount: amount.amount,
        category: categoryValue,
        account: accountValue,
        date: dateValue,
      };
    }
  
    addTransactions(payload, dispatch);
    setAccountValue(0);
    setCategoryValue(0);
    setDateValue("");
    setSelectedMethod("");
    setAmount({ amount: 0 });
    setSnackbarMessage("Transaction Completed Successfully.");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  }
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 5,
        "@media (max-width: 600px)": {
          padding: "0 10px",
        },
      }}
    >
      <div>
        <h1>Add Transaction</h1>
        <NumberField value={amount.amount} onChange={handleChange} />
        <br />
        <br />
        <RadioBtn value={selectedMethod} change={handleRadioChange} />
        <br /> <br />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "@media (min-width: 600px)": {
              flexDirection: "row",
              alignItems: "center",
            },
          }}
        >
          <Selected
            heading="Select Category"
            valuesArray={category}
            selectedMethod={selectedMethod}
            value={categoryValue}
            defaultValue={"Select Any Category"}
            Change={handleSelectCategoryChange}
          />
          <Box sx={{ width: 20 }} />
          <Selected
            heading="Select Account"
            valuesArray={accounts}
            value={accountValue}
            defaultValue={"Select Any Account"}
            Change={handleSelectAccountChange}
          />
          <Box sx={{ width: 20 }} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <FormLabel>Select Date</FormLabel>
            <TextField
              type="date"
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
            />
          </Box>
        </Box>
        <br />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {" "}
          {/* Adjusted */}
          <Button
            onClick={handleAddTransactions}
            variant="contained"
            sx={{ mt: 1 }}
          >
            Add transaction
          </Button>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <MuiAlert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    </Box>
  );
}
