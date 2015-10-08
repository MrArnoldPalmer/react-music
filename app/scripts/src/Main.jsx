import React from 'react';
// import Dropbox from 'dropbox';
import Artist from './Artist.jsx';
import * as Dropbox from './modules/Dropbox.jsx';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      userInfo: {},
      artists: []
    };
    this.readArtistDir = this.readArtistDir.bind(this);
    this.setup = this.setup.bind(this);
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
            <button onClick={this.readArtistDir}>
              Read Files
            </button>
            {this.state.artists.map(artist => {
              return (
                <Artist artist={artist} key={artist} />
              );
            })}
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
