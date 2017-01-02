'use strict'

import React from 'react'

class App extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div className="app">
        <h1>Hi there</h1>
        <figure id="videoContainer">
           <video id="video" controls preload="metadata" poster="img/poster.png">
              <source src="videos/sample.mp4" type="video/mp4" />
           </video>
           <figcaption>&copy; Polaris Chen</figcaption>
        </figure>
			</div>
		)
	}
}

export default App
