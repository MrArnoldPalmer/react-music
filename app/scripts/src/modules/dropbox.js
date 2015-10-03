import Dropbox from 'dropbox';

export let client = new Dropbox.Client({
  key: 'tc4bq5m2e9hh24h'
});

export function signIn() {
  return new Promise((resolve, reject) => {
    client.authenticate((error, data) => {
      if(error) {
        reject(error);
      }
      resolve(data);
    });
  });
}
