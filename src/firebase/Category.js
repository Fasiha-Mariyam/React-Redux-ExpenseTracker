import { db } from "./Config";
import { collection, getDocs, addDoc , deleteDoc , doc} from "firebase/firestore";
import { addCategory , deleteCategory, startLoading, stopLoading} from "../redux/slices/category";
import { userId } from "../utils";

const id = await userId();
let categoryCollection;

if (id !== null) {
  categoryCollection = collection(db, "users", id, "category");
} else {
  // Handle the case when userId returns null
  console.error("User ID is null");
}

export const getAllCategory = async (id) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users", id, "category"));
    const categoryData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return categoryData;
  } catch (error) {}
};

export const addCategories = async (name, dispatch) => {
  try {
    dispatch(startLoading())
    const docRef = await addDoc(categoryCollection, { categoryName : name });
    const categoryId = docRef.id;
    const payload = [{ id: categoryId, data: { categoryName: name } }];
    dispatch(addCategory(payload));
    dispatch(stopLoading())
  } catch (error) {
    console.error('Error adding category:', error.message);
  }
};

export const categoryDelete = async (id,dispatch) =>{
try {
    deleteDoc(doc(categoryCollection, id))
    dispatch(deleteCategory(id));
} catch (error) {
    console.error("Error deleting category:", error);
}
}