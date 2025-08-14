import { ipcRenderer } from 'electron'
import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

console.log('Preload script loaded successfully')

const api = {
  on: (channel: string, listener: (...args: any[]) => void): void => {
    ipcRenderer.on(channel, (_, ...args) => {
      console.log((`Preload.js => on: channel = ${channel} with args: ${args}`))
      listener(...args)}
    )
  },
    off: (channel: string, listener: (...args: any[]) => void): void => {
    // Removes the exact listener reference previously registered
    ipcRenderer.removeListener(channel, listener)
  },
  invoke: (channel: string, ...args: any[]): Promise<any> => {
    console.log(`Preload.js => invoke: channel = ${channel} with args: ${args}`)
    return ipcRenderer.invoke(channel, ...args)
  },
	onCopyText: (callback: (text: string) => void): void => {
		// callback('Test send of onCopyText outside ipcRenderer.on')
		ipcRenderer.on('copy-text', (_, text) => {
			console.log('preload.js: => onCopyText:', text)
			callback(text)
		})
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
