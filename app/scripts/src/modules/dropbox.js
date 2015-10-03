import Dropbox from 'dropbox';

let client = new Dropbox.Client({
  key: //env var here
});

export default client;
