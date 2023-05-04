export function dataStorage() {
  let historyData = {};

  return {
    setID() {
      const id = new Date().getTime().toString(36).slice(-6);
      return id;
    },
    saveData(data, id) {
      historyData[id] = data;
      localStorage.setItem("history", JSON.stringify(historyData));
    },
    loadData(callback) {
      historyData = JSON.parse(localStorage.getItem("history")) || historyData;
      for (const id in historyData) callback(historyData[id], id) 
    },
    deleteData(id) {
      delete historyData[id];
      localStorage.setItem("history", JSON.stringify(historyData));
    },
  };
}