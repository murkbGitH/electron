'use strict'

const binding = process.atomBinding('ipc')
const v8Util = process.atomBinding('v8_util')
const ipcRendererInternal = require('../ipc-renderer-internal')

// Created by init.js.
const ipcRenderer = v8Util.getHiddenValue(global, 'ipc')

ipcRenderer.send = function (...args) {
  return binding.send('ipc-message', args)
}

ipcRenderer.sendSync = function (...args) {
  return binding.sendSync('ipc-message-sync', args)[0]
}

ipcRenderer.sendToHost = function (...args) {
  return binding.send('ipc-message-host', args)
}

ipcRenderer.sendTo = function (webContentsId, channel, ...args) {
  if (typeof webContentsId !== 'number') {
    throw new TypeError('First argument has to be webContentsId')
  }

  const internal = false
  const sendToAll = false

  ipcRendererInternal.send('ELECTRON_BROWSER_SEND_TO', internal, sendToAll, webContentsId, channel, ...args)
}

ipcRenderer.sendToAll = function (webContentsId, channel, ...args) {
  if (typeof webContentsId !== 'number') {
    throw new TypeError('First argument has to be webContentsId')
  }

  const internal = false
  const sendToAll = true

  ipcRendererInternal.send('ELECTRON_BROWSER_SEND_TO', internal, sendToAll, webContentsId, channel, ...args)
}

module.exports = ipcRenderer
