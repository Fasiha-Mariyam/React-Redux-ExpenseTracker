import { auth, db } from "../Config";
import { getSignUp, hasError, startLoading } from "../../redux/slices/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";

export const SignUp = async (email, password, name, dispatch) => {
  try {
    dispatch(startLoading())
    console.log(name, email, password);
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const user = cred.user;
    if (user) {
      
      const userRef = await addDoc(collection(db, "users"), {
        name: name,
        email: email,
      });
      const accountsCollection = collection(
        db,
        "users",
        userRef.id,
        "accounts"
      );
      const Category = collection(
        db,
        "users",
        userRef.id,
        "category"
      );

      // Create" Saving" account
      await addDoc(accountsCollection, {
        accountName: "Saving",
        amount: 0,
      });

      // Create  "Cash" account
      await addDoc(accountsCollection, {
        accountName: "Cash",
        amount: 0,
      });

      await addDoc(Category, {
        categoryName: "Home",
      });
      await addDoc(Category, {
        categoryName: "Shopping",
      });
      await addDoc(Category, {
        categoryName: "Medical",
      });
      await Swal.fire({
        icon: "success",
        title: "User Created Successfully!",
        text: "The user has been successfully created. Thank you for signing up!",
        confirmButtonColor: "#3085d6",
      });
      dispatch(getSignUp({ name, email, id: userRef.id }));
      
    }
  } catch (error) {
    console.error("Error signing up:", error.message);
    dispatch(hasError())
    await Swal.fire({
      icon: "error",
      title: "Oops...!",
      text: "This Email ID is already in use!",
      confirmButtonColor: "#3085d6"
    });
  }
};
