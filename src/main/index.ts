import path from 'path'
import { app, BrowserWindow, globalShortcut, screen, clipboard } from 'electron'
import { join } from 'path'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import { keyboard, Key } from '@nut-tree-fork/nut-js'

const simulateCopyFn = async () => {
	// Simulate Cmd+C (on macOS)
	await keyboard.pressKey(Key.LeftSuper) // 'Super' = Command on mac
	await keyboard.type(Key.C)
	await keyboard.releaseKey(Key.LeftSuper)
	const text = clipboard.readText()
	console.log('Copied text:', text)
	return text
}

async function createMenuOverlayWindow() {
	const { x, y } = screen.getCursorScreenPoint()
	const win = new BrowserWindow({
		width: 300,
		height: 400,
		x,
		y,
		backgroundMaterial: 'acrylic',
		show: true,
		vibrancy: 'popover',
		backgroundColor: '#00000000',
		transparent: true,
		resizable: false,
		frame: false,
		skipTaskbar: true,
		title: 'goodword.ai',
		webPreferences: {
			preload: path.join(__dirname, '../preload/index.js'),
			contextIsolation: false,
			nodeIntegration: true
		}
		// frame: false,
		// transparent: true,
		// resizable: true,
		// alwaysOnTop: true,
		// skipTaskbar: true,
		// vibrancy: undefined,
		// visualEffectState: 'inactive', // optional
		// hasShadow: false,          // 💥 removes the drop shadow
		// thickFrame: false,
		// roundedCorners: false,
	})

	// In dev, use vite dev server
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
	})

	// Optional: Close on blur
	win.on('blur', () => {
		if (!win.webContents.isDevToolsOpened()) {
			win.close()
		}
	})

	return win
}

const initMenu = async () => {
	console.log('Initiating Menu Window')
	const copiedText = await simulateCopyFn()
	const menu = await createMenuOverlayWindow()
	menu.webContents.on('did-finish-load', () => {
		console.log('index.ts: copiedText => preload:', copiedText)
		menu.webContents.send('copy-text', copiedText)
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	// Set app user model id for windows
	electronApp.setAppUserModelId('com.electron')

	// Default open or close DevTools by F12 in development
	// and ignore CommandOrControl + R in production.
	// see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window)
	})

	// createWindow()

	// app.on('activate', function () {
	//   // On macOS it's common to re-create a window in the app when the
	//   // dock icon is clicked and there are no other windows open.
	//   if (BrowserWindow.getAllWindows().length === 0) createWindow()
	// })

	globalShortcut.register('Option+Space', initMenu)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

// Old boilerplate:
// function createWindow(): void {
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     width: 900,
//     height: 670,
//     show: false,
//     autoHideMenuBar: true,
//     ...(process.platform === 'linux' ? { icon } : {}),
//     webPreferences: {
//       preload: join(__dirname, '../preload/index.js'),
//       sandbox: false
//     }
//   })

//   mainWindow.on('ready-to-show', () => {
//     mainWindow.show()
//   })

//   mainWindow.webContents.setWindowOpenHandler((details) => {
//     shell.openExternal(details.url)
//     return { action: 'deny' }
//   })

//   // HMR for renderer base on electron-vite cli.
//   // Load the remote URL for development or the local html file for production.
//   if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
//     mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
//   } else {
//     mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
//   }
// }
