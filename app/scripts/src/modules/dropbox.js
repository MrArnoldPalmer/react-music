import Dropbox from 'dropbox';

export let client = new Dropbox.Client({
  key: 'tc4bq5m2e9hh24h'
});

export function signIn() {
  return new Promise(function(resolve, reject) {
    client.authenticate(function(error, data) {
      if(error) {
        return reject(error);
      }
      return resolve(data);
    });
  });
}
