
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

const config = require('./config')

const backgroundColor = '#F8F8F8'
const windowWidth = 1280;
const windowHeight = 744;

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
	if (process.platform != 'darwin') {
		app.quit()
	}
})

function openMainWindow() {
	mainWindow = new BrowserWindow({
		width: windowWidth,
		height: windowHeight,
		backgroundColor: backgroundColor,
		show: false
	})

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
		height: 420,
		backgroundColor: backgroundColor,
		show: false
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
	config.saveConfig('captionType', arg.caption)

	openMainWindow()
})
