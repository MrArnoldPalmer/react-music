import React from 'react';
import Artist from './Artist.jsx';
import Player from './Player.jsx';
import * as Dropbox from './modules/Dropbox.jsx';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      userInfo: {},
      artists: [],
      currentArtist: '',
      currentAlbum: '',
      currentSong: ''
    };
    this.readArtistDir = this.readArtistDir.bind(this);
    this.setup = this.setup.bind(this);
    this.select = this.select.bind(this);
  }
  readArtistDir() {
    return new Promise((resolve, reject) => {
      Dropbox.readDir('/')
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
  select(artist, album, song) {
    this.setState({
      currentArtist: artist,
      currentAlbum: album,
      currentSong: song
    });
  }
  setup() {
    Dropbox.signIn()
      .then(data => {
        return Dropbox.getUserInfo();
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
            <button className='button__confirm' onClick={this.readArtistDir}>
              Read Files
            </button>
            {this.state.artists.map(artist => {
              return (
                <Artist artist={artist} key={artist} select={this.select}/>
              );
            })}
          </div>
        ) : (
          <div>
            <button className='button__confirm' onClick={this.setup}>
              Sign In
            </button>
            <p>sign in to read files</p>
          </div>
        )}
        <Player className='player' song={this.state.currentSong} album={this.state.currentAlbum} artist={this.state.currentArtist} />
      </div>
    );
  }
}
