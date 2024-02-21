import {
  Container,
  CardContent,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NameField from "../../../components/FormFields/NameField";
import NumberField from "../../../components/FormFields/NumberField";
import AmountDataCard from "../../../components/Card/AmountDataCard";
import AllAccountsCard from "../../../components/Card/AllAccountsCard";
import { AddAccount } from "../../../firebase/Account";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function Accounts() {
  const dispatch = useDispatch();
  const reduxAccounts = useSelector((state) => state.account.account);
  const Loader = useSelector((state) => state.account.isLoading);
  const [cashAmount, setCashAmount] = useState(0);
  const [savingAmount, setSavingAmount] = useState(0);
  const [bankTotal, setBankTotal] = useState(0);
  const [account, setAccount] = useState({ name: "", amount: "" });
  const [accounts, setAccounts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  useEffect(() => {
    setAccounts(reduxAccounts);
    const cashAccount = reduxAccounts.find(
      (acc) => acc.data.accountName === "Cash"
    );
    const savingAccount = reduxAccounts.find(
      (acc) => acc.data.accountName === "Saving"
    );
    setCashAmount(cashAccount.data.amount);
    setSavingAmount(savingAccount.data.amount);

    const bankTotalAmount = reduxAccounts.reduce((total, acc) => {
      if (
        acc.data.accountName !== "Cash" &&
        acc.data.accountName !== "Saving"
      ) {
        return total + parseFloat(acc.data.amount);
      }
      return total;
    }, 0);

    console.log(reduxAccounts);
    setBankTotal(bankTotalAmount);
  }, [reduxAccounts]);

  const handleChange = (field, value) => {
    setAccount({
      ...account,
      [field]: value,
    });
  };

  const handleAddAccount = () => {
    const nameExists = accounts.find(
      (acc) => acc.data.accountName.toLowerCase() === account.name.toLowerCase()
    );
    if (account.name.trim() === "" || account.amount.trim() === "") {
      console.log("Please fill all fields.");
      setSnackbarMessage("Fill All the Required Fields First");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } else if (!nameExists) {
      AddAccount(account.name, account.amount, dispatch);
      setAccount({ name: "", amount: "" });
      setSnackbarMessage("Account added Successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } else {
      console.log("Account with this name already exists.");
      setSnackbarMessage("Account with this name already exists.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      // You can add a state to manage an error message and display it in your UI
    }
    
  };

  return (
    <>
      {/* Add Account Form */}
      <Container maxWidth="lg" style={{ textAlign: "center" }}>
        <Grid container justifyContent="center">
          <Grid
            item
            xs={12}
            sm={9}
            boxShadow={9}
            borderRadius={4}
            m={2}
            sx={{
              background: "linear-gradient(to right, #B0BEC5, #B0BEC5)", // Light blue background
              color: "#37474F", // Dark gray text color
            }}
          >
            <CardContent sx={{ width: "100%", mt: 5 }}>
              <div>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Add Account
                </Typography>
                <br />
                <NameField value={account.name} onChange={handleChange} />
                <br />
                <br />
                <NumberField value={account.amount} onChange={handleChange} />
                <br />
                <br />
                <Button
                  variant="contained"
                  onClick={handleAddAccount}
                  sx={{ color: "black" }}
                >
                  Add Account
                </Button>
              </div>
            </CardContent>
          </Grid>
        </Grid>
      </Container>
      <Container
        sx={{
          display: "flex",
          my: 5,
          p: 2,
          background:
            "linear-gradient(to right, rgb(118 127 137), rgb(25 118 210))",
        }}
      >
        <AmountDataCard name={"Cash"} amount={cashAmount} />
        <AmountDataCard name={"Bank"} amount={bankTotal} />
        <AmountDataCard name={"Savings"} amount={savingAmount} />
      </Container>

      {/* All Accounts */}
      <Typography
        variant="h4"
        m={2}
        sx={{
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Added Accounts
      </Typography>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          maxHeight: "300px",// Set a maximum width for the container
          overflowY: "auto", // Enable horizontal overflow scrolling
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          mb: 6,
          width: "80%",
          borderRadius: "8px",
          p: 1,
        }}
      >
        {accounts.map((account) => (
          <AllAccountsCard
            key={account.id}
            id={account.id}
            account={account.data}
            deleteBtn={
              account.data.accountName !== "Saving" &&
              account.data.accountName !== "Cash"
            }
            sx={{
              flex: "0 0 calc(33.33% - 4px)", // Set a fixed width for each box
              mb: 2, // Add margin between boxes
            }}
          />
        ))}
      </Container>
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
    </>
  );
}
