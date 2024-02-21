import { auth, db } from "../Config";
import { getSignUp, startLoading } from "../../redux/slices/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

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
      dispatch(getSignUp({ name, email, id: userRef.id }));
      
    }
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};
