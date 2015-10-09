import React from 'react';
import * as Dropbox from './modules/Dropbox.jsx';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: []
    };
    this.getSongs = this.getSongs.bind(this);
  }
  getSongs() {
    return new Promise((resolve, reject) => {
      Dropbox.readDir(this.props.artist + '/' + this.props.album)
      .then(songs => {
        resolve(songs);
      })
      .catch(error => {
        reject(error);
      });
    });
  }
  componentDidMount() {
    this.getSongs()
    .then(songs => {
      this.setState({
        songs: songs
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  render() {
    return (
      <div>
        {this.props.album}
        <ul>
          {this.state.songs.map(song => {
            return (
              <li key={song}>
                {song}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
