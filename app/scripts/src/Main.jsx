import React from 'react';
import Dropbox from 'dropbox';

export default class Main extends React.Component {
  constructor() {
    super();
    this.client = new Dropbox.Client({
      key: 'tc4bq5m2e9hh24h'
    });
    this.state = {
      name: '',
      files: []
    };
    this.signIn = this.signIn.bind(this);
    this.readDir = this.readDir.bind(this);
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
  componentDidMount() {
    this.signIn()
    .then(data => {
      this.readDir()
      .then(entries => {
        console.log(entries);
      })
    })
  }
  render() {
    return <div>client</div>;
  }
}
