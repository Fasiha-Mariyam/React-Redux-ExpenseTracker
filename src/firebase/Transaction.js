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

let transactionsCollection; // Declare accountsCollection globally

async function setTransactionCollection() {
  try {
    const id = await userId();
    if (id !== null) {
      transactionsCollection = collection(db, "users", id, "transactions");
    } else {
      console.error("User ID is null");
    }
  } catch (error) {
    console.error("Error setting accounts collection:", error);
  }
}
setTransactionCollection();

export const addTransactions = async (transactionArray, dispatch) => {
  try {
    setTransactionCollection()
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
    setTransactionCollection();
    deleteDoc(doc(transactionsCollection, id));
    dispatch(deleteTransaction(id));
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};

export const getSortedTransactions = async (dispatch , id) => {
  try {
    dispatch(startLoading());
    setTransactionCollection();
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
