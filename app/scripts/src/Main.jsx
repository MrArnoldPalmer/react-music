import React from 'react';
import Dropbox from 'dropbox';
import {client, signIn} from './modules/dropbox.js';

export default class Main extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    console.log(client);
    signIn()
      .then(function(data) {
        client.getAccountInfo(function(error, info) {
          console.log(info);
        });
      });
  }
  render() {
    return <div>client</div>;
  }
}
