import { app, contextBridge, IpcRenderer, ipcRenderer } from 'electron'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'
import { Customer, NewCustomer } from '../shared/types/ipc'
import { CustomTitlebar, TitlebarColor, Titlebar } from 'custom-electron-titlebar'
import { is } from '@electron-toolkit/utils'

declare global {
  export interface Window {
    electron: ElectronAPI
    api: typeof api
  }
}

// window.addEventListener('DOMContentLoaded', () => {
//   new Titlebar({
//     containerOverflow: 'visible'
//   })
// })

// Custom APIs for renderer
const api = {
  onNewClient: (callback: () => void) => {
    ipcRenderer.on('new-client', callback)

    return () => {
      ipcRenderer.off('new-client', callback)
    }
  },
  addCustomer: (doc: NewCustomer): Promise<PouchDB.Core.Response | void> =>
    ipcRenderer.invoke('add-customer', doc),
  fetchAllCustomers: (): Promise<Customer[]> => ipcRenderer.invoke('fetch-all-customers'),
  fetchCustomerById: (
    docId: string
  ): Promise<(Customer & PouchDB.Core.IdMeta & PouchDB.Core.GetMeta) | null> =>
    ipcRenderer.invoke('fetch-customer-by-id', docId),
  deleteCustomer: (docId: string): Promise<PouchDB.Core.Response | null> =>
    ipcRenderer.invoke('delete-customer', docId),
  appVersion: (): Promise<string> => ipcRenderer.invoke('app-version'),
  manualMinimize: (): Promise<boolean> => ipcRenderer.invoke('manual-minimize'),
  manualMaximize: (): Promise<boolean> => ipcRenderer.invoke('manual-maximize'),
  manualClose: (): Promise<boolean> => ipcRenderer.invoke('manual-close')
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
