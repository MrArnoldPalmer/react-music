import React from 'react';

export default class View extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'artists'
    };
    this.selectArtistView = this.selectArtistView.bind(this);
    this.selectAlbumView = this.selectAlbumView.bind(this);
  }
  selectArtistView() {
    this.setState({view: 'artists'});
  }
  selectAlbumView() {
    this.setState({view: 'albums'});
  }
  render() {
    let library;
    if(this.state.view === 'artists') {
      library = (
        <div>artists</div>
      );
    }
    else if(this.state.view === 'albums') {
      library = (
        <div>albums</div>
      );
    }
    return (
      <div>
        <button onClick={this.selectArtistView}>Artists</button>
        <button onClick={this.selectAlbumView}>Albums</button>
        {library}
      </div>
    );
  }
}
