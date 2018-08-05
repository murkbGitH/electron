'use strict'

const binding = process.atomBinding('ipc')
const v8Util = process.atomBinding('v8_util')

// Created by init.js.
const ipcRenderer = v8Util.getHiddenValue(global, 'ipc-internal')

ipcRenderer.send = function (...args) {
  return binding.send('ipc-internal-message', args)
}

ipcRenderer.sendSync = function (...args) {
  return binding.sendSync('ipc-internal-message-sync', args)[0]
}

ipcRenderer.sendTo = function (webContentsId, channel, ...args) {
  if (typeof webContentsId !== 'number') {
    throw new TypeError('First argument has to be webContentsId')
  }

  ipcRenderer.send('ELECTRON_BROWSER_SEND_TO', true, false, webContentsId, channel, ...args)
}

ipcRenderer.sendToAll = function (webContentsId, channel, ...args) {
  if (typeof webContentsId !== 'number') {
    throw new TypeError('First argument has to be webContentsId')
  }

  ipcRenderer.send('ELECTRON_BROWSER_SEND_TO', true, true, webContentsId, channel, ...args)
}

module.exports = ipcRenderer
