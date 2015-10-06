import React from 'react';
import Dropbox from 'dropbox';

export default class Main extends React.Component {
  constructor() {
    super();
    this.client = new Dropbox.Client({
      key: 'tc4bq5m2e9hh24h'
    });
    this.state = {
      loggedIn: false,
      userInfo: {},
      artists: [],
      albums: {},
    };
    this.signIn = this.signIn.bind(this);
    this.readDir = this.readDir.bind(this);
    this.readArtistDir = this.readArtistDir.bind(this);
    this.readAlbumDir = this.readAlbumDir.bind(this);
    this.setup = this.setup.bind(this);
  }
  signIn() {
    return new Promise((resolve, reject) => {
      this.client.authenticate((error, data) => {
        if(error) {
          reject(error);
        }
        resolve(data);
      });
    });
  }
  getUserInfo() {
    return new Promise((resolve, reject) => {
      this.client.getAccountInfo((error, info) => {
        if(error) {
          reject(error);
        }
        resolve(info);
      });
    });
  }
  readDir(directory) {
    return new Promise((resolve, reject) => {
      this.client.readdir(directory, (error, entries, dir_stat, entry_stat) => {
        if(error) {
          reject(error);
        }
        resolve(entries);
      });
    });
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
    let albums = [];
    if(this.state.artists.length > 0) {
      for(let artist of this.state.artists) {
        albumsObj.artist = [];
        albums.push(this.readDir(artist));
      }
      Promise.all(albums)
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
      console.log('no');
      this.readArtistDir()
      .then(() => {
        for(let artist of this.state.artists) {
          albumsObj.artist = [];
          albums.push(this.readDir(artist));
        }
        Promise.all(albums)
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
    })
  }
  render() {
    return (
      <div>
        {this.state.loggedIn ? (
          <div>
            <button onClick={this.readArtistDir}>Read Files</button>
            <button onClick={this.readAlbumDir}>Read Albums</button>
            <p>{this.state.albums}</p>
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
