export const setStorageItem = (key, obj) => {
  try {
    localStorage.setItem(key, JSON.stringify(obj));
    return true;
  } catch (e) {
    console.log("Error in setting data -->", e);
    return null;
  }
};

export const getStorageItem = async (key) => {
  try {
    let storedData = localStorage.getItem(key);
    return storedData ? storedData : null;
  } catch (e) {
    console.log("Error in getting data -->", e);
    return null;
  }
};

export const isValidName = (name) => {
  // Regular expression to match empty string or alphabets (uppercase and lowercase)
  const namePattern = /^$|^[a-zA-Z]+$/;
  return namePattern.test(name);
};

export const isValidAmount = (amount) => {
  return amount === "" || (!isNaN(amount) && amount > 0);
};

export const userId = async () => {
  const userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString);
    return user.id;
  } else {
    // Handle the case when localStorage is empty
    return null;
  }
};
