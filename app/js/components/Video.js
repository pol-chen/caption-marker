'use strict'

import React from 'react'

const log = window.require('./log')
const config = window.require('./config')

let capStyle = {
	width: 200
}

let appendedMode = config.readConfig('captionMode') == 'seg'

class Video extends React.Component {
	constructor(props) {
		super(props)
		document.onkeypress = this.handleKeyPress
		this.state = {
			capCount: 0,
			capString: '',
			lastEndTime: 0
		}
	}
  componentDidMount() {
		if (!config.readConfig('video')) {
			this.initConfig()
		}

		const cap = document.querySelector('#cap')
		cap.style.display = 'none'
		if (appendedMode) {
			const textTrack = document.querySelector('video').textTracks[0]
			const that = this
			textTrack.mode = 'hidden'
			textTrack.oncuechange = function () {
				const cue = this.activeCues[0]
				const lastEndTime = that.state.lastEndTime
				// if (cue.endTime != lastEndTime) {
					const capCount = that.state.capCount
					if (capCount == 2) {
						cap.style.display = 'none'
						that.setState({capCount: 0})
						that.setState({capString: ''})
						console.log('Set zero 2')
					}
					if (cue) {
						console.log('Active cue:', cue.startTime, cue.endTime, cue.text)
						cap.style.display = ''
						const lastCap = that.state.capString
						const separator = '　'
						let capString
						if (cue.startTime - lastEndTime < 0.2 && lastCap) {
							capString = lastCap + separator + cue.text
							that.setState({capCount: capCount + 1})
							cap.innerHTML = cap.innerHTML + separator + cue.text
						} else {
							capString = cue.text
							cap.innerHTML = capString
						}
						const capWidth = capString.length * 36 + 2
						capStyle = {
							width: capWidth
						}
						that.setState({capString: capString})
						that.setState({lastEndTime: cue.endTime})
					} else {
						console.log('No cue')
						cap.style.display = 'none'
						that.setState({capCount: 0})
						that.setState({capString: ''})
						console.log('Set zero')
					}
				// }
			}
		}
  }
	initConfig() {
		config.saveConfig('name', 'Polaris')
		config.saveConfig('video', 'Dolphins')
		config.saveConfig('speed', 'slow')
		config.saveConfig('caption', 'less')
		config.saveConfig('captionError', 'less')
		const errors = [ '3-2', '5-1', '6-1' ]
		config.saveConfig('errors', errors)
	}
  handleKeyPress = event => {
    const textTrack = document.querySelector('video').textTracks[0]
		const cap = document.querySelector('#cap')
		const offset = 48

		let cue = textTrack.activeCues[0]
		let mark = 0
		if (cue) {
			let index = event.keyCode - offset

			if (appendedMode) {
				console.log('Pressed', index, '/', this.state.capCount+1);

				let cueText = cap.innerHTML
				let texts = cueText.match(/^(.*?)　(.*?)　(.*?)$/)
				if (texts == null) {
					texts = cueText.match(/^(.*?)　(.*?)$/)
				}
				if (texts == null) {
					texts = cueText.match(/^(.*?)$/)
				}

				let focusText = texts[index].match(/<span class="highlight">(.*?)<\/span>/)
				let newFocusText
				if (focusText) {
					newFocusText = focusText[1]
					mark = 0
				} else {
					newFocusText = `<span class="highlight">${texts[index]}</span>`
					mark = 1
				}
				cap.innerHTML = cueText.replace(texts[index], newFocusText)

			} else {
				let cueText = cue.text
	      let texts = cueText.match(/^(.*?)\s{4}(.*?)\s{4}(.*?)$/)
				if (texts == null) {
					texts = cueText.match(/^(.*?)\s{4}(.*?)$/)
				}
				if (texts == null) {
					texts = cueText.match(/^(.*?)$/)
				}

				let focusText = texts[index].match(/<c\.n1>(.*?)<\/c>/)
				let newFocusText
				if (focusText) {
					newFocusText = focusText[1]
					mark = 0
				} else {
					newFocusText = `<c.n1>${texts[index]}</c>`
					mark = 1
				}
				cue.text = cueText.replace(texts[index], newFocusText)
				cue.align = 'start'
				cue.align = 'middle' // For force refresh
			}

			const name = config.readConfig('name')
			const video = config.readConfig('video')
			const speed = config.readConfig('speed')
			const caption = config.readConfig('caption')
			const captionError = config.readConfig('captionError')

			if (appendedMode) {
				cue = textTrack.cues[textTrack.activeCues[0].id-1-(this.state.capCount+1-index)]
				console.log('Appended Mode:', cue.text);
			}
			const captionId = cue.id
			const captionStartTime = cue.startTime
			const captionSection = appendedMode ? cue.id : `${cue.id}-${index}`
			const sectionWithError = config.hasError(captionSection)
			const markDone = mark
			const markTime = document.querySelector('video').currentTime - cue.startTime

			const sep = '\t'
			const logContent = name+sep+video+sep+speed+sep+caption+sep+captionError+sep+captionId+sep+captionStartTime+sep+captionSection+sep+sectionWithError+sep+markDone+sep+markTime
      log.append(logContent)

			console.log('Marked', logContent)
		} else {
			console.log('Not marked')
		}
	}
	render() {
		const videoFilename = config.readConfig('videoFilename')
		const videoSrc = `videos/${videoFilename}.mp4`
		const trackSrc = `captions/vtt/${videoFilename}${appendedMode ? '-seg' : ''}.vtt`
		return (
      <figure id="videoContainer">
         <video id="video" controls preload="metadata">
            <source src={videoSrc} type="video/mp4" />
            <track label="Default" kind="subtitles" srcLang="zh" src={trackSrc} default />
         </video>
         <div id="cap" style={capStyle}></div>
      </figure>
		)
	}
}

export default Video
