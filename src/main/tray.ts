import { Menu, Tray, nativeImage, BrowserWindow } from 'electron'
import { join, resolve } from 'node:path'

export function createTray(window: BrowserWindow) {
  const appIcon = join(__dirname, 'resources', 'menuTemplate.png')
  let icon = nativeImage.createFromPath(appIcon)

  const tray = new Tray(icon)

  const menu = Menu.buildFromTemplate([
    { icon: icon, label: 'Dev Clientes', enabled: false },
    { type: 'separator' },
    {
      label: 'Cadastrar Cliente',
      click: () => {
        // Enviar uma mensagem do processo principal (main) para o processo de renderização (renderer)
        window.webContents.send('new-client')
        if (window.isMinimized()) window.restore()
        window.focus()
      }
    },
    { label: 'Abrir', click: () => window.show() },
    { type: 'separator' },
    { label: 'Sair', role: 'quit' }
  ])

  tray.setToolTip('Dev Clientes')

  tray.setContextMenu(menu)
}
