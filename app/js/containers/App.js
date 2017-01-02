'use strict'

import React from 'react'

const log = window.require('./log')

class App extends React.Component {
	constructor(props) {
		super(props)
    this.state = {
			activeCue: null,
		}
	}
  componentDidMount() {
    const videoElement = document.querySelector("video")
    const textTrack = videoElement.textTracks[0]
    const that = this
    textTrack.oncuechange = function () {
      const cue = this.activeCues[0]
      if (cue) {
        console.log('Active cue:', cue.startTime, cue.endTime, cue.text)
        that.setState({activeCue: cue})
      } else {
        that.setState({activeCue: null})
      }
    }
    document.onkeypress = this.handleKeyPress
  }
  handleKeyPress = event => {
    const firstKeyCode = 49
    const secondKeyCode = 50
    const thirdKeyCode = 51

    const cue = this.state.activeCue
    if (cue != null && event.keyCode >= firstKeyCode && event.keyCode <= thirdKeyCode) {
      const cueId = cue.id
      const cueText = cue.text
      const length = Math.floor(cueText.length / 3)
      let markedIndex = 0
      let markedText = ''
      switch (event.keyCode) {
        case firstKeyCode:
          markedIndex = 1
          markedText = cueText.substring(0, length)
          break;
        case secondKeyCode:
          markedIndex = 2
          markedText = cueText.substring(length, length * 2)
          break;
        case thirdKeyCode:
          markedIndex = 3
          markedText = cueText.substring(length * 2, cueText.length)
          break;
        default:
          break;
      }
      console.log('Marking', markedIndex, markedText)
      const content = `Cue ID: ${cueId}; Text: ${cueText}; Marked Text: ${markedText}; Marked Position: ${markedIndex}`
      log.append(content)
    } else {
      console.log('Not marking')
    }
  }
	render() {
		return (
			<div className="app">
        <h1>Hi there</h1>
        <figure id="videoContainer">
           <video id="video" controls preload="metadata" poster="img/poster.png">
              <source src="videos/sample.mp4" type="video/mp4" />
              <track label="Simplified Chinese" kind="subtitles" srcLang="zh" src="captions/vtt/sample.vtt" default />
           </video>
           <figcaption>&copy; Polaris Chen</figcaption>
        </figure>
			</div>
		)
	}
}

export default App
