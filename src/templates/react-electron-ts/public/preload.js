const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getAppDetails: () => ipcRenderer.invoke("getAppDetails"),
});
