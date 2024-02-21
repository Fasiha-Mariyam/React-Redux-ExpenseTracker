import { db } from "./Config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  addCategory,
  deleteCategory,
  startLoading,
  stopLoading,
} from "../redux/slices/category";
import { userId } from "../utils";

let categoryCollection; // Declare accountsCollection globally

async function setCategoryCollection() {
  try {
    const id = await userId();
    if (id !== null) {
      categoryCollection = collection(db, "users", id, "category");
    } else {
      // Handle the case when userId returns null
      console.error("User ID is null");
    }
  } catch (error) {
    console.error("Error setting accounts collection:", error);
  }
}
setCategoryCollection();

export const getAllCategory = async (id) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "users", id, "category")
    );
    const categoryData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return categoryData;
  } catch (error) {}
};

export const addCategories = async (name, dispatch) => {
  try {
    dispatch(startLoading());
    setCategoryCollection();
    const docRef = await addDoc(categoryCollection, { categoryName: name });
    const categoryId = docRef.id;
    const payload = [{ id: categoryId, data: { categoryName: name } }];
    dispatch(addCategory(payload));
    dispatch(stopLoading());
  } catch (error) {
    console.error("Error adding category:", error.message);
  }
};

export const categoryDelete = async (id, dispatch) => {
  try {
    setCategoryCollection();
    deleteDoc(doc(categoryCollection, id));
    dispatch(deleteCategory(id));
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};
