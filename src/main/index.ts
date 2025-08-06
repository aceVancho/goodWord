import path from 'path'
import { app, shell, BrowserWindow, globalShortcut, screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createMenuOverlayWindow() {
  // const { width, height } = screen.getPrimaryDisplay().bounds
  const { x, y } = screen.getCursorScreenPoint()


  const win = new BrowserWindow({
    width: 300,
    height: 400,
    x,
    y,
    // frame: false,
    // transparent: true,
    // resizable: true,

    backgroundMaterial: 'acrylic', // Optional: Use acrylic effect
    // alwaysOnTop: true,
    // skipTaskbar: true,
    show: true,
    // vibrancy: undefined,
    // visualEffectState: 'inactive', // optional
    // hasShadow: false,          // 💥 removes the drop shadow
    vibrancy: 'popover',  // optional, or remove for full transparency
    backgroundColor: '#00000000', // fully transparent
    transparent: true,
    resizable: false,
    frame: false,
    skipTaskbar: true,
    // thickFrame: false,
    // roundedCorners: false,
    title: 'Uxon Dynamics Updater',
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js.js'),
    },
  })

  // In dev, use vite dev server
  if (!app.isPackaged) {
    win.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/menu.html`)
    console.log('Loading menu.html from packaged app')
    // win.webContents.openDevTools({ mode: 'detach' }) // Uncomment for devTools on state
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

    globalShortcut.register('Option+Space', () => {
    console.log('Shift+Space is pressed')
    createMenuOverlayWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
