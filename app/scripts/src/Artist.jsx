import React from 'react';
import DropboxComponent from './modules/Dropbox.jsx';

export default class Artist extends DropboxComponent {
  constructor() {
    super();
    this.state = {
      albums: []
    };
    this.readAlbumDir = this.readAlbumDir.bind(this);
  }
  readAlbumDir() {
    return new Promise((resolve, reject) => {
      this.readDir('/')
      .then(entries => {
        this.setState({
          albums: entries
        });
        resolve();
      })
      .catch(error => {
       reject(error);
      });
    })  
  }
  componentDidMount() {
    //this.readAlbumDir();
    console.log(this.client.isAuthenticated());
  }
  render() {
    return (
      <ul>
        {this.props.artist}
        {this.state.albums.map(album => {
          return (
            <Album album={album} key={album} />
          );
        })}
      </ul>
    );
  }
}
