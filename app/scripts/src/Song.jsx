import React from 'react';
import * as Dropbox from './modules/Dropbox.jsx';

export default class Song extends React.Component {
  constructor() {
    super();
    this.state = {
      url: ''
    };
    this.playSong = this.playSong.bind(this);
  }
  playSong() {
    Dropbox.getUrl(this.props.artist + '/' + this.props.album + '/' + this.props.song)
    .then(data => {
      let song = document.getElementById(this.props.song);
      song.setAttribute('src', data.url);
      song.play();
    })
    .catch(error => {
      console.log(error);
    });
  }
  render() {
    return (
      <div>
       <audio id={this.props.song}></audio>
       <h3 onClick={this.playSong}>{this.props.song}</h3>
      </div>
    );
  }
}
