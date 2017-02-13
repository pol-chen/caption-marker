'use strict'

import React from 'react'

import Video from '../components/Video'
import LogBar from '../components/LogBar'

const log = window.require('./log')

class App extends React.Component {
	constructor(props) {
		super(props)
    this.state = {
			activeCue: null,
      logText: 'Caption Marker - Use key 1/2/3 to mark errors in captions'
		}
    document.onkeypress = this.handleKeyPress
	}
  handleCueChange = cue => {
    this.setState({activeCue: cue})
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
      // let regx = /<c\.n1>(.*?)<\/c><c\.n2>(.*?)<\/c><c\.n3>(.*?)<\/c>/
      // let texts = cueText.match(regx);
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
      // markedText = texts[markedIndex]
      // const content = `Cue ID: ${cueId}; Text: ${texts.join('').replace(cueText, '')}; Marked Text: ${markedText}; Marked Position: ${markedIndex}`
			const content = `Cue ID: ${cueId}; Text: ${cueText}; Marked Text: ${markedText}; Marked Position: ${markedIndex}`
      const logText = `Marked "${markedText}" in ${markedIndex}/3 of cue ${cueId}`
      console.log('Marked', markedIndex, markedText)
      this.setState({logText: logText})
      log.append(content)
    } else {
      console.log('Not marked')
      this.setState({logText: 'Not marked'})
    }
  }
	render() {
		return (
			<div className="app">
        <Video onCueChange={this.handleCueChange} />
        <LogBar logText={this.state.logText} />
			</div>
		)
	}
}

export default App
