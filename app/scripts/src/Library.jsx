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
    return (
      <div>
        <button onClick={this.selectArtistView}>Artists</button>
        <button onClick={this.selectAlbumView}>Albums</button>
        {this.state.view === 'artists' ? (
          <ul>
            {this.props.artists.map(artist => {
              return (
                <li key={artist}>
                  {artist}
                </li>
              );
            })}
          </ul>
        ) : (
          <ul>
            {this.props.artists.map(artist => {
              return (
                <li key={artist}>
                  {artist}: {this.props.albums.artist}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
