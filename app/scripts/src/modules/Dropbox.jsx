import Dropbox from 'dropbox';

export let client = new Dropbox.Client({
  key: 'tc4bq5m2e9hh24h'
});

export function readDir(directory) {
  return new Promise((resolve, reject) => {
    this.client.readdir(directory, (error, entries, dir_stat, entry_stat) => {
      if(error) {
        reject(error);
      }
      resolve(entries);
    });
  });
}

export function signIn() {
  return new Promise((resolve, reject) => {
    this.client.authenticate((error, data) => {
      if(error) {
        reject(error);
      }
      resolve(data);
    });
  });
}

export function getUserInfo() {
  return new Promise((resolve, reject) => {
    this.client.getAccountInfo((error, info) => {
      if(error) {
        reject(error);
      }
      resolve(info);
    });
  });
}

export function getUrl(file) {
  return new Promise((resolve, reject) => {
    this.client.makeUrl(file, {downloadHack: true}, (error, data) => {
      if(error) {
        reject(error);
      }
      resolve(data);
    });
  });
}
