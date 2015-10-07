import React from 'react';
import Album from './Album.jsx';

export default class View extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 'artists',
      currentAlbum: null
    };
    this.selectArtistView = this.selectArtistView.bind(this);
    this.selectAlbumView = this.selectAlbumView.bind(this);
    this.selectCurrentAlbum = this.selectCurrentAlbum.bind(this);
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
                  {artist}:
                  <ul>
                    {this.props.albums.artist}
                    {this.props.albums.artist.map(album => {
                      return <Album artist={artist} album={album}/>;
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
