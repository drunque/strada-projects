export function storage(render) {
  const storage = [];

  function saveData() {
    localStorage.setItem("aktobe-data", JSON.stringify(storage));
    render(storage);
  }
  
  return {
    addData(data) {
      storage.push(data);
      saveData();
    },
    removeData(data) {
      storage.splice(storage.indexOf(data), 1);
      saveData();
    },
    loadData() {
      const loadedData = JSON.parse(localStorage.getItem("aktobe-data")) || [];
      if (!loadedData.length) return;
      for (const data of loadedData) storage.push(data);
      render(storage);
    },
    includes(data) {
      return storage.includes(data);
    },
  };
}
