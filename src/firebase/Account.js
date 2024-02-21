import { db } from "./Config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import {
  createAccounts,
  deleteAccount,
  updateAccount,
} from "../redux/slices/account";
import { userId } from "../utils";

let accountsCollection; // Declare accountsCollection globally

async function setAccountsCollection() {
  try {
    const id = await userId();
    if (id !== null) {
      accountsCollection = collection(db, "users", id, "accounts");
    } else {
      console.error("User ID is null");
    }
  } catch (error) {
    console.error("Error setting accounts collection:", error);
  }
}
setAccountsCollection();

export const AddAccount = async (name, amount, dispatch) => {
  try {
    setAccountsCollection();
    const accountObj = {
      accountName: name,
      amount: amount,
    };
    const docRef = await addDoc(accountsCollection, accountObj);
    const accountId = docRef.id;
    const payload = [
      {
        id: accountId,
        data: accountObj,
      },
    ];
    dispatch(createAccounts(payload));
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};

export const getAllAccounts = async (id) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "users", id, "accounts")
    );
    const accountsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return accountsData;
  } catch (error) {}
};

export const accountDelete = async (id, dispatch) => {
  try {
    setAccountsCollection();
    deleteDoc(doc(accountsCollection, id));
    dispatch(deleteAccount(id));
  } catch (error) {
    console.error("Error deleting account:", error);
  }
};

export const updateAccountAmount = async (
  accountName,
  amountToUpdate,
  selectedMethod,
  dispatch
) => {
  await setAccountsCollection();
  const q = query(accountsCollection, where("accountName", "==", accountName));
  let updateSuccess = true;
  try {
    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
      const accountId = doc.id;
      const currentAmount = doc.data().amount;

      let updatedAmount = 0;

      if (selectedMethod === "Income") {
        updatedAmount = currentAmount + parseInt(amountToUpdate);
      } else {
        if (currentAmount > parseInt(amountToUpdate))
          updatedAmount = currentAmount - parseInt(amountToUpdate);
        else {
          updateSuccess = false;
          break; // Exit the loop early if balance is insufficient
        }
      }

      // Update the account with the new amount
      await updateDoc(doc.ref, { amount: updatedAmount });
      await dispatch(updateAccount({ id: accountId, amount: updatedAmount }));
      console.log(
        `Account ${accountName} updated with amount: ${updatedAmount}`
      );
    }
  } catch (error) {
    console.error("Error updating account amount:", error);
    updateSuccess = false; // Set update success to false in case of error
  }

  return updateSuccess; // Return the update success status after the loop
};
