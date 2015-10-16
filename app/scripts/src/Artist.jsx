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
    this.select = this.select.bind(this);
    this.select = this.select.bind(this);
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
  select(album, song) {
    this.props.select(this.props.artist, album, song);
  }
  render() {
    return (
      <ul>
        {this.props.artist}
        {this.state.albums.map(album => {
            return (
              <Album album={album} artist={this.props.artist} key={album} select={this.select}/>
            );
          })}
      </ul>
    );
  }
}
