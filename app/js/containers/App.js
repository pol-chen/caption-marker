'use strict'

import React from 'react'

class App extends React.Component {
	constructor(props) {
		super(props)
    this.state = {
			activeCueText: '',
		}
	}
  componentDidMount() {
    const videoElement = document.querySelector("video")
    const textTrack = videoElement.textTracks[0]
    const that = this
    textTrack.oncuechange = function () {
      const cue = this.activeCues[0]
      if (cue) {
        console.log(cue.startTime, cue.endTime, cue.text)
        that.setState({activeCueText: cue.text})
        console.log('Active cue:', that.state.activeCueText)
      }
    }
    document.onkeypress = this.handleKeyPress
  }
  handleKeyPress = event => {
    const firstKeyCode = 49
    const secondKeyCode = 50
    const thirdKeyCode = 51

    const cueText = this.state.activeCueText
    const length = Math.floor(cueText.length / 3)
    switch (event.keyCode) {
      case firstKeyCode:
        console.log('1 pressed')
        console.log('Marking', cueText.substring(0, length))
        break;
      case secondKeyCode:
        console.log('2 pressed')
        console.log('Marking', cueText.substring(length, length * 2))
        break;
      case thirdKeyCode:
        console.log('3 pressed')
        console.log('Marking', cueText.substring(length * 2, cueText.length))
        break;
      default:
        break;
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
