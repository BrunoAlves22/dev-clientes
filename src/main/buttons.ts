import { BrowserWindow, ipcMain } from 'electron'

export function manualButtons(window: BrowserWindow) {
  ipcMain.handle('manual-minimize', () => {
    window.minimize()
  })

  ipcMain.handle('manual-maximize', () => {
    if (window.isMaximized()) {
      window.unmaximize()
    } else {
      window.maximize()
    }
  })

  ipcMain.handle('manual-close', () => {
    window.close()
  })
}
