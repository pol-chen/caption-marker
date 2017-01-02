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

              <object type="application/x-shockwave-flash" data="flash-player.swf?videoUrl=videos/sample.mp4" width="1024" height="576">
                 <param name="movie" value="flash-player.swf?videoUrl=videos/sample.mp4" />
                 <param name="allowfullscreen" value="true" />
                 <param name="wmode" value="transparent" />
                 <param name="flashvars" value="controlbar=over&amp;image=img/poster.png&amp;file=flash-player.swf?videoUrl=videos/sample.mp4" />
                 <img alt="Sample poster image" src="img/poster.png" width="1024" height="428" title="No video playback possible, please download the video from the link below" />
              </object>
           </video>
           <figcaption>&copy; Polaris Chen</figcaption>
        </figure>
			</div>
		)
	}
}

export default App
