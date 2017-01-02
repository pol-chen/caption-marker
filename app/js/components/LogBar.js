'use strict'

import React from 'react'

class LogBar extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
      <div className="logBar">
        {this.props.logText}
      </div>
		)
	}
}

export default LogBar
