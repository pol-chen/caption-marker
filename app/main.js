
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

const backgroundColor = '#F8F8F8'
const windowWidth = 1280;
const windowHeight = 780;

let mainWindow

app.on('ready', () => {
	openMainWindow()

	if (process.env.NODE_ENV === 'development') {
		installDevtools()
		mainWindow.openDevTools()
	}
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
