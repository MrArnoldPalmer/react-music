import React from 'react';
import * as Dropbox from './modules/Dropbox.jsx';

export default class Song extends React.Component {
  constructor() {
    super();
    this.state = {
      url: ''
    };
    this.select = this.select.bind(this);
  }
  select() {
    this.props.select(this.props.artist, this.props.album, this.props.song);
  }
  render() {
    return (
      <div>
        <h3 onClick={this.select}>{this.props.song}</h3>
      </div>
    );
  }
}
