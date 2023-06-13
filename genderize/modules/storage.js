export function storage() {
  const historyData = JSON.parse(localStorage.getItem("genderize")) || {};

  return {
    setID() {
      const id = new Date().getTime().toString(36).slice(-12);
      return id;
    },
    save(data, id) {
      historyData[id] = data;
      localStorage.setItem("genderize", JSON.stringify(historyData));
    },
    load(callback) {
      for (const id in historyData) callback(historyData[id], id) 
    },
    delete(id) {
      delete historyData[id];
      localStorage.setItem("genderize", JSON.stringify(historyData));
    },
  };
}