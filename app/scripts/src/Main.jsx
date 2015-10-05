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
      files: []
    };
    this.signIn = this.signIn.bind(this);
    this.readDir = this.readDir.bind(this);
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
  readDir() {
    return new Promise((resolve, reject) => {
      this.client.readdir('/', (error, entries) => {
        if(error) {
          reject(error);
        }
        resolve(entries);
      });
    });
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
        <button onClick={this.setup}>
          Sign In
        </button>
        {this.state.loggedIn ? (
          <button onClick={this.readDir}>Read Files</button> 
          ):(
          <p>sign in to read files</p>
        )}
      </div>
    );
  }
}
