import React from 'react';
import Dropbox from 'dropbox';
import Library from './Library.jsx';
import DropboxComponent from './modules/Dropbox.jsx';

export default class Main extends DropboxComponent {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      userInfo: {},
      artists: [],
      albums: {},
    };
    this.readArtistDir = this.readArtistDir.bind(this);
    this.readAlbumDir = this.readAlbumDir.bind(this);
    this.setup = this.setup.bind(this);
  }
  readArtistDir() {
    return new Promise((resolve, reject) => {
      this.readDir('/')
      .then(entries => {
        this.setState({
          artists: entries
        });
        resolve();
      })
      .catch(error => {
        reject(error);
      });
    });
  }
  readAlbumDir() {
    let albumsObj = {};
    let albumPromises = [];
    if(this.state.artists.length > 0) {
      for(let artist of this.state.artists) {
        albumsObj.artist = [];
        albumPromises.push(this.readDir(artist));
      }
      Promise.all(albumPromises)
      .then(albums => {
        for(let i = 0; i < albums.length; i++) {
          let artist = this.state.artists[i];
          albumsObj.artist.push(albums[i]);
        }
        this.setState({
          albums: albumsObj
        });
      });
    }
    else {
      this.readArtistDir()
      .then(() => {
        for(let artist of this.state.artists) {
          albumsObj.artist = [];
          albumPromises.push(this.readDir(artist));
        }
        Promise.all(albumPromises)
        .then(albums => {
          for(let i = 0; i < albums.length; i++) {
            let artist = this.state.artists[i];
            albumsObj.artist.push(albums[i]);
          }
          this.setState({
            albums: albumsObj
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
    }
  }
  setup() {
    this.signIn()
    .then(data => {
      return this.getUserInfo();
    })
    .then(info => {
      this.setState({
        loggedIn: true,
        userInfo: info
      });
    });
  }
  render() {
    return (
      <div>
        {this.state.loggedIn ? (
          <div>
            <button onClick={this.readArtistDir}>Read Files</button>
            <button onClick={this.readAlbumDir}>Read Albums</button>
            {this.state.artists.length && Object.keys(this.state.albums).length ? (
              <Library artists={this.state.artists} albums={this.state.albums} client={this.client}/>
            ) : (
              null
            )}
          </div>
          ):(
          <div>
            <button onClick={this.setup}>
              Sign In
            </button>
            <p>sign in to read files</p>
          </div>
        )}
      </div>
    );
  }
}
