import React from 'react';
import DropboxComponent from './modules/Dropbox.jsx';

export default class Album extends DropboxComponent {
  constructor() {
    super();
    this.state = {
      songs: []
    };
    this.getTracks = this.getTracks.bind(this);
  }
  getTracks() {
    return new Promise((resolve, reject) => {
      this.readDir(artist + album)
      .then(songs => {
        resolve(songs);
      })
      .catch(error => {
        reject(error);
      });
    });
  }
  // componentDidMount() {
  //   this.getTracks(this.props.artist + this.props.album)
  //   .then(songs => {
  //     this.setState({
  //       songs: songs,
  //       artist: this.props.artist
  //     });
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });
  // }
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
