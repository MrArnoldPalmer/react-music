import React from 'react';
import Dropbox from 'dropbox';
import {client, signIn} from './modules/dropbox.js';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ''
    };
    this.userLogIn = this.userLogIn.bind(this);
  }

  userLogIn() {
    signIn()
      .then(data => {
        client.getAccountInfo((error, info) => {
          this.setState({
            name: info.name
          });
          console.log(this.state.name);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.userLogIn();
  }
  
  render() {
    return <div>client</div>;
  }
}
