import path from 'path'
import {
	app,
	BrowserWindow,
	globalShortcut,
	screen,
	clipboard,
	ipcMain
} from 'electron'
import { join } from 'path'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { keyboard, Key } from '@nut-tree-fork/nut-js'
import { searchThesaurus, simpleSearchThesaurus, toneProfessional } from './api/agents/agents'

const simulateCopyFn = async () => {
	// Simulate Cmd+C (on macOS)
	await keyboard.pressKey(Key.LeftSuper) // 'Super' = Command on mac
	await keyboard.type(Key.C)
	await keyboard.releaseKey(Key.LeftSuper)
	const text = clipboard.readText()
	console.log('Copied text:', text)
	return text
}

async function createMenuOverlayWindow(): Promise<BrowserWindow> {
	const { x, y } = screen.getCursorScreenPoint()
	const win = new BrowserWindow({
		width: 350,
		height: 450,
		// width: 1000,
		// height: 1000,
		x,
		y,
		show: true,
		backgroundMaterial: 'acrylic',
		vibrancy: 'popover',
		backgroundColor: '#00000000',
		transparent: true,
		resizable: true,
		frame: false,
		skipTaskbar: true,
		title: 'goodword.ai',
    alwaysOnTop: true,
		webPreferences: {
			preload: !app.isPackaged
				? path.join(__dirname, '../../out/preload/index.js')
				: path.join(__dirname, '../preload/index.js'),
			contextIsolation: true,
			nodeIntegration: false,
			sandbox: false
		},
	})

	if (!app.isPackaged) {
		win.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/menu.html`)
		console.log('Loading menu.html from packaged app')
		win.webContents.openDevTools({ mode: 'detach' }) // Uncomment for devTools on state
	} else {
		// win.loadFile(path.join(__dirname, '../../out/menu.html'))
		win.loadFile(join(__dirname, '../renderer/index.html'))
	}

	win.once('ready-to-show', () => {
		win.showInactive() // Doesn’t steal focus
		console.log('Menu window is ready to show')
		// win.setIgnoreMouseEvents(true, { forward: true })
	})

	// Optional: Close on blur
	win.on('blur', () => {
		if (!win.webContents.isDevToolsOpened()) {
			console.log('Menu window is ready to show')
			win.close()
		}
	})

	return win
}

const initMenu = async (): Promise<void> => {
	console.log('Initiating Menu Window')
	const copiedText = await simulateCopyFn()
	const menu = await createMenuOverlayWindow()

	menu.webContents.on('did-finish-load', () => {
		console.log('index.ts: copiedText => preload:', copiedText)
		menu.webContents.send('copy-text', copiedText)
	})

  watchClipboard(menu)
}

const registerIPCHandlers = (map: Record<string, (...a:any[]) => any>) => {
  for (const [channel, fn] of Object.entries(map)) {
    ipcMain.handle(channel, (_e, ...args) => fn(...args));
  }
}

let last = ''
const watchClipboard = (win: BrowserWindow) => {
  setInterval(() => {
    const text = clipboard.readText()
    if (text && text !== last) {
      last = text
      win.webContents.send('clipboard:changed', text)
    }
  }, 500)
}

app.whenReady().then(() => {
	electronApp.setAppUserModelId('com.electron')

	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window)
	})

	globalShortcut.register('Option+Space', initMenu)

  registerIPCHandlers({
    'search:thesaurus': (term: string) => simpleSearchThesaurus(term),
    // 'search:thesaurus': (term: string) => searchThesaurus(term),
    'tone:professional': (text: string) => toneProfessional(text)
  })
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
