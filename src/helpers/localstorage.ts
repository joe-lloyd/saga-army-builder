enum LocalstorageKeys {
  army='army',
  units="units",
  points="points",
}

const addToLocalStorage = (key: LocalstorageKeys, value: {} | string) => {
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

export { addToLocalStorage, LocalstorageKeys };
