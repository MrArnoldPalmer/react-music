import React from 'react';
import Dropbox from 'dropbox';

export default class DropboxComponent extends React.Component {
  constructor() {
    super();
    this.client = new Dropbox.Client({
      key: 'tc4bq5m2e9hh24h'
    });
    this.readDir = this.readDir.bind(this);
    this.signIn = this.signIn.bind(this);
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
}
