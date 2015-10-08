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
      Dropbox.readDir(artist + album)
      .then(songs => {
        resolve(songs);
      })
      .catch(error => {
        reject(error);
      });
    });
  }
  render() {
    return (
      <div>
        {this.props.album}
        <ul>
          {this.state.songs.map(song => {
            return (
              <li>
                {song}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
