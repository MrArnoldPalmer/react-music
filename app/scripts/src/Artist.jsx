import React from 'react';
import Album from './Album.jsx';
import * as Dropbox from './modules/Dropbox.jsx';

export default class Artist extends React.Component {
  constructor() {
    super();
    this.state = {
      albums: []
    };
    this.readAlbumDir = this.readAlbumDir.bind(this);
  }
  readAlbumDir() {
    return new Promise((resolve, reject) => {
      Dropbox.readDir(this.props.artist)
      .then(entries => {
        this.setState({
          albums: entries
        });
        resolve();
      })
      .catch(error => {
       reject(error);
      });
    });
  }
  componentDidMount() {
    this.readAlbumDir();
  }
  render() {
    return (
      <ul>
        {this.props.artist}
        {this.state.albums.map(album => {
          return (
            <Album artist={this.props.artist} album={album} key={album} />
          );
        })}
      </ul>
    );
  }
}
