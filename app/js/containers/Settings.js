'use strict'

import React from 'react'

const {ipcRenderer} = window.require('electron')

class Settings extends React.Component {
	constructor(props) {
		super(props)
	}
  componentDidMount() {
    const nameInput = document.querySelector('#nameInput')
    nameInput.focus()
  }
  handleClick(e) {
    e.preventDefault()

    const nameInput = document.querySelector('#nameInput')
    const videoSelect = document.querySelector('#videoSelect')
    const captionSelect = document.querySelector('#captionSelect')

    const info = {
      name: nameInput.value,
      video: videoSelect.value,
      caption: captionSelect.value
    }

    ipcRenderer.send('init-video', info)
  }
	render() {
		return (
			<div id="settings">
        <h1>Welcome</h1>
        <label>名字</label>
        <input id="nameInput" type="text" placeholder="请输入您的名字" />
        <label>视频</label>
        <select id="videoSelect" defaultValue="dolphin">
          <option value="dolphin">BBC 海豚纪录片</option>
          <option value="likaifu">鲁豫有约-李开复</option>
          <option value="news">央视新闻联播</option>
          <option value="zootopia">疯狂动物城</option>
        </select>
        <label>字幕</label>
        <select id="captionSelect" defaultValue="line">
          <option value="line">分行显示</option>
          <option value="seg">分段显示</option>
        </select>
        <a className="btn-main" onClick={this.handleClick}>Start</a>
			</div>
		)
	}
}

export default Settings
