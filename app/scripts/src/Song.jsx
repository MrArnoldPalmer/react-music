import React from 'react';
import * as Dropbox from './Dropbox.jsx';

export default class Song extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      {this.props.song}
    );
  }
}
