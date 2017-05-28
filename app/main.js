
const electron = require('electron')
const {app, BrowserWindow, ipcMain} = electron
const path = require('path')

const config = require('./config')

const backgroundColor = '#F8F8F8'

let mainWindow
let settingsWindow

app.on('ready', () => {
	// openMainWindow()
	openSettingsWindow()

	// if (process.env.NODE_ENV === 'development') {
	// 	installDevtools()
	// 	mainWindow.openDevTools()
	// }
})

app.on('window-all-closed', () => {
	app.quit()
})

function openMainWindow() {
	const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
	mainWindow = new BrowserWindow({
		width: width,
		height: height,
		backgroundColor: backgroundColor,
		show: false
	})

	mainWindow.openDevTools()

	mainWindow.once('ready-to-show', () => {
	  mainWindow.show()
	})

	mainWindow.loadURL('file://' + __dirname + '/index.html')

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

function installDevtools() {
	const devtoolsInstaller = require('electron-devtools-installer')
  devtoolsInstaller.default(devtoolsInstaller.REACT_DEVELOPER_TOOLS)
    .then((name) => console.log(`Added Extension: ${name}`))
    .catch((err) => console.log('An error occurred: ', err))
}

function openSettingsWindow() {
	settingsWindow = new BrowserWindow({
		width: 400,
		height: 430,
		backgroundColor: backgroundColor,
		show: false,
		resizable: false
	})

	settingsWindow.once('ready-to-show', () => {
	  settingsWindow.show()
	})

	settingsWindow.loadURL('file://' + __dirname + '/settings.html')

	settingsWindow.on('closed', () => {
		settingsWindow = null
	})
}

ipcMain.on('init-video', (event, arg) => {
	console.log(arg)
	config.saveConfig('name', arg.name)

	config.saveConfig('video', config.readConfig(arg.video).video)
	config.saveConfig('speed', config.readConfig(arg.video).speed)
	config.saveConfig('caption', config.readConfig(arg.video).caption)
	config.saveConfig('captionError', config.readConfig(arg.video).captionError)
	config.saveConfig('errors', config.readConfig(arg.video).errors)

	config.saveConfig('videoFilename', arg.video)
	config.saveConfig('captionMode', arg.caption)

	openMainWindow()
})
