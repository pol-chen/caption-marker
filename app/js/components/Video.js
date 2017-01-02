'use strict'

import React from 'react'

class Video extends React.Component {
	constructor(props) {
		super(props)
	}
  componentDidMount() {
    const videoElement = document.querySelector("video")
    const textTrack = videoElement.textTracks[0]
    const that = this
    textTrack.oncuechange = function () {
      const cue = this.activeCues[0]
      if (cue) {
        console.log('Active cue:', cue.startTime, cue.endTime, cue.text)
        that.props.onCueChange(cue)
      } else {
        console.log('No cue')
        that.props.onCueChange(null)
      }
    }
  }
	render() {
		return (
      <figure id="videoContainer">
         <video id="video" controls preload="metadata" poster="img/poster.png">
            <source src="videos/sample.mp4" type="video/mp4" />
            <track label="Simplified Chinese" kind="subtitles" srcLang="zh" src="captions/vtt/sample.vtt" default />
         </video>
         <figcaption>&copy; Polaris Chen</figcaption>
      </figure>
		)
	}
}

export default Video
