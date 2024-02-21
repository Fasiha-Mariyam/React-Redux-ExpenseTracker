import { db } from "./Config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import {
  addTransaction,
  deleteTransaction,
  stopLoading,
  startLoading,
} from "../redux/slices/transaction";
import { userId } from "../utils";

const id = await userId();
let transactionsCollection;

if (id !== null) {
  transactionsCollection = collection(db, "users", id, "transactions");
} else {
  // Handle the case when userId returns null
  console.error("User ID is null");
}

export const addTransactions = async (transactionArray, dispatch) => {
  try {
    const docRef = await addDoc(transactionsCollection, transactionArray);
    const transactionId = docRef.id;
    const payload = [{ id: transactionId, data: transactionArray }];
    dispatch(addTransaction(payload));
  } catch (error) {
    console.error("Error adding category:", error.message);
  }
};

export const getTransactions = async (id) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "users", id, "transactions")
    );
    const transactionData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return transactionData;
  } catch (error) {}
};

export const transactionDelete = async (id, dispatch) => {
  try {
    deleteDoc(doc(transactionsCollection, id));
    dispatch(deleteTransaction(id));
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};

export const getSortedTransactions = async (dispatch , id) => {
  try {
    dispatch(startLoading());
    const collectionRef = id ? collection(db, "users", id, "transactions") : transactionsCollection;
    const q = query(collectionRef, orderBy("date", "desc")); // Sort transactions by date in descending order
    const querySnapshot = await getDocs(q);
    const transactionData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    console.log(transactionData);
    dispatch(stopLoading());
    return transactionData;
  } catch (error) {
    console.error("Error fetching sorted transactions:", error);
    dispatch(stopLoading());
    throw error; // Rethrow the error for handling in the component
  }
};
