import { app, ipcMain } from 'electron'

ipcMain.handle('app-version', () => {
  return app.getVersion()
})
