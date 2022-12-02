const addToLocalStorage = (key: string, value: {} | string) => {
  try {
    if (typeof value === "string") {
      window.localStorage.setItem(key, value);
    } else {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(error);
  }
};

export { addToLocalStorage };
