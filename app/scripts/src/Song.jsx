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
    let song = document.getElementById(this.props.song);
    console.log(song);
    song.play();
  }
  componentDidMount() {
    Dropbox.client.makeUrl(this.props.artist + '/' + this.props.album + '/' + this.props.song, {download: true}, (error, url) => {
      this.setState({
        url: url.url
      });
    });
  }
  render() {
    return (
      <div>
       <audio id={this.props.song} src={this.state.url}></audio> 
       <h3 onClick={this.playSong}>{this.props.song}</h3>
      </div>
    );
  }
}
