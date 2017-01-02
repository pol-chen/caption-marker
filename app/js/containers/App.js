'use strict'

import React from 'react'

class App extends React.Component {
	constructor(props) {
		super(props)
	}
  componentDidMount() {
    var videoElement = document.querySelector("video")
    var textTrack = videoElement.textTracks[0]
    textTrack.oncuechange = this.handleCueChange
    document.onkeypress = this.handleKeyPress
  }
  handleCueChange = function () {
    var cue = this.activeCues[0]
    if (cue) {
      console.log(cue.startTime, cue.endTime, cue.text)
    }
  }
  handleKeyPress = event => {
    const firstKeyCode = 49
    const secondKeyCode = 50
    const thirdKeyCode = 51
    switch (event.keyCode) {
      case firstKeyCode:
        console.log('1 pressed')
        break;
      case secondKeyCode:
        console.log('2 pressed')
        break;
      case thirdKeyCode:
        console.log('3 pressed')
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
