import { auth, db } from "../Config";
import {
  getSignin,
  startLoading,
  hasError,
  stopLoading,
} from "../../redux/slices/auth";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { setStorageItem } from "../../utils/index";
import { addCategory } from "../../redux/slices/category";
import { createAccounts } from "../../redux/slices/account";
import { addTransaction } from "../../redux/slices/transaction";
import { getAllCategory } from "../Category";
import { getAllAccounts } from "../Account";
import Swal from "sweetalert2";
import { getSortedTransactions } from "../Transaction";

const colRef = collection(db, "users");

export const LogIn = async (email, password, dispatch, navigate) => {
  try {
    dispatch(startLoading());
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const user = cred.user;
    console.log(user);

    if (user != null) {
      const q = query(colRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        const userDoc = querySnapshot.docs[0];
        const userData = { ...userDoc.data(), id: userDoc.id };
        const userId = userDoc.id;

        dispatch(getSignin({ email, id: userId }));
        setStorageItem("user", userData);
        await Swal.fire({
          icon: "success",
          title: "User Logged In Successfully!",
          text: "You have successfully logged in. Welcome back!",
          confirmButtonColor: "#3085d6",
        });
        navigate("/dashboard");

        const categories = await getAllCategory(userId);
        const categoriesWithIdAndData = categories.map((category) => ({
          id: category.id,
          data: category.data,
        }));
        dispatch(addCategory(categoriesWithIdAndData));

        const accounts = await getAllAccounts(userId);
        const accountsWithIdAndData = accounts.map((acc) => ({
          id: acc.id,
          data: acc.data,
        }));
        dispatch(createAccounts(accountsWithIdAndData));

        const transactions = await getSortedTransactions(dispatch , userId);
        const transactionWithIdAndData = transactions.map((acc) => ({
          id: acc.id,
          data: acc.data,
        }));
        dispatch(addTransaction(transactionWithIdAndData));
      } else {
        console.log("User not found");
      }
    }
  } catch (error) {
    console.error("Error signing in:", error.message);
    dispatch(hasError(error));
    Swal.fire({
      icon: "error",
      title: "Invalid Credentials",
      text: "Something went wrong!",
      confirmButtonColor: "#3085d6",
    });
  }
};

export const forgetPassword = async (email, dispatch) => {
  try {
    dispatch(startLoading());
    console.log(email);
    const q = query(colRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
      // Email exists
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        icon: "success",
        title: "Password Reset Email Sent!",
        text: "An email with instructions to reset your password has been sent to your inbox.",
        confirmButtonColor: "#3085d6",
      });
    } else {
      // Email does not exist
      Swal.fire({
        icon: "error",
        title: "Email Not Found",
        text: "This email address is not associated with any account.",
        confirmButtonColor: "#3085d6",
      });
    }
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "An error occurred while processing your request. Please try again later.",
      confirmButtonColor: "#3085d6",
    });
  }
  dispatch(stopLoading());
};
