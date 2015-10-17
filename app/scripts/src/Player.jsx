import React from 'react';
import * as Dropbox from './modules/Dropbox.jsx';

export default class Player extends React.Component {
  constructor() {
    super();
    this.state = {
      currentSongUrl: ''
    };
    this.playSong = this.playSong.bind(this);
    this.pauseSong = this.pauseSong.bind(this);
  }
  playSong() {
    Dropbox.getUrl(this.props.artist + '/' + this.props.album + '/' + this.props.song)
      .then(data => {
        this.setState({
          currentSongUrl: data.url
        });
        this.audio.play();
      })
      .catch(error => {
        console.log(error);
      });
  }
  pauseSong() {
    this.audio.pause();
  }
  componentDidMount() {
    this.audio = document.getElementById('audio');
  }
  render() {
    return (
      <div>
        <audio id='audio' className='audio' src={this.state.currentSongUrl} />
        <button onClick={this.playSong}>play</button>
        <button onClick={this.pauseSong}>pause</button>
      </div>
    );
  }
}
