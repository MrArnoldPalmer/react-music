import React from 'react';
import Dropbox from 'dropbox';
// import client from './modules/dropbox.js';

export default class Main extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    let client = new Dropbox.Client({
      key: 'tc4bq5m2e9hh24h'
    });
    console.log(client);
  }
  render() {
    return <div>client</div>;
  }
}
