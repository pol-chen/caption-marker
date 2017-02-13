'use strict'

import React from 'react'

class Video extends React.Component {
	constructor(props) {
		super(props)
		document.onkeypress = this.handleKeyPress
	}
  componentDidMount() {
    const textTrack = document.querySelector('video').textTracks[0]
		const that = this
		textTrack.oncuechange = function () {
			let cue = this.activeCues[0]
			if (cue) {
				console.log('Active cue:', cue.startTime, cue.endTime, cue.text)
				that.props.onCueChange(cue)
			} else {
				console.log('No cue')
				that.props.onCueChange(null)
			}
		}
  }
  handleKeyPress = event => {
    const textTrack = document.querySelector('video').textTracks[0]
		const offset = 48

		let cue = textTrack.activeCues[0]
		if (cue) {
			let cueText = cue.text
      let texts = cueText.match(/^(.*?)\s{4}(.*?)\s{4}(.*?)$/)
			if (texts == null) {
				texts = cueText.match(/^(.*?)\s{4}(.*?)$/)
			}
			if (texts == null) {
				texts = cueText.match(/^(.*?)$/)
			}

			console.log(texts)
			let index = event.keyCode - offset
			let focusText = texts[index].match(/<c\.n1>(.*?)<\/c>/)
			let newFocusText
			if (focusText) {
				newFocusText = focusText[1]
			} else {
				newFocusText = `<c.n1>${texts[index]}</c>`
			}
			cue.text = cueText.replace(texts[index], newFocusText)
			cue.align = 'start'
			cue.align = 'middle' // For force refresh
		}
	}
	render() {
		return (
      <figure id="videoContainer">
         <video id="video" controls preload="metadata" poster="img/poster.png">
            <source src="videos/sample.mp4" type="video/mp4" />
            <track label="Spaced" kind="subtitles" srcLang="zh" src="captions/vtt/sample-spaced.vtt" default />
            <track label="Plain" kind="subtitles" srcLang="zh" src="captions/vtt/sample.vtt" />
            <track label="Split" kind="subtitles" srcLang="zh" src="captions/vtt/sample-split.vtt" />
         </video>
      </figure>
		)
	}
}

export default Video
