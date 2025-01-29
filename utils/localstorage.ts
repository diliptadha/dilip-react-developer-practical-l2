export const saveToLocalStorage = (key: string, value: string) => {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, value);
    }
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};

export const getFromLocalStorage = (key: string) => {
  try {
    if (typeof window !== "undefined") {
      const value = window.localStorage.getItem(key);
      return value;
    }
  } catch (error) {
    console.error("Error reading from localStorage", error);
  }
  return null;
};

export const removeFromLocalStorage = (key: string) => {
  try {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  } catch (error) {
    console.error("Error removing from localStorage", error);
  }
};
