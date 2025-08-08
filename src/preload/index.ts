import { ipcRenderer } from 'electron';
import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload';

console.log('Preload script loaded successfully');

const api = {
    onCopyText: (callback: (text: string) => void) => {
    // callback('Test send of onCopyText outside ipcRenderer.on')
    ipcRenderer.on('copy-text', (_, text) => {
      console.log('preload.js: => onCopyText:', text);
      callback(text);
    });
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
