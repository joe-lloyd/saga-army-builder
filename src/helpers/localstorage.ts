

const addUnitsToLocalStorage = (key: string, value: {}) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.log(error);
  }
}

export { addUnitsToLocalStorage };
