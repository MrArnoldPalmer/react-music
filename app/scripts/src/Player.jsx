import React from 'react';

export default class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      currentSong: ''
    };
    this.playSong = this.playSong.bind(this);
  }
  playSong() {
  }
}
