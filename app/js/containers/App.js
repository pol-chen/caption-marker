'use strict'

import React from 'react'

import Video from '../components/Video'

class App extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className="app">
        <Video />
			</div>
		)
	}
}

export default App
