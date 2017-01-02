'use strict'

import React from 'react'

import Video from '../components/Video'

const log = window.require('./log')

class App extends React.Component {
	constructor(props) {
		super(props)
    this.state = {
			activeCue: null,
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
        <Video onCueChange={this.handleCueChange} />
			</div>
		)
	}
}

export default App
