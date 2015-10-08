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
    this.readAlbumDir = this.readAlbumDir.bind(this);
  }
  selectArtistView() {
    this.setState({view: 'artists'});
  }
  selectAlbumView() {
    this.setState({view: 'albums'});
  }
  readAlbumDir() {
    let albumsObj = {};
    let albumPromises = [];
    if(this.state.artists.length > 0) {
      for(let artist of this.state.artists) {
        albumsObj.artist = [];
        albumPromises.push(this.readDir(artist));
      }
      Promise.all(albumPromises)
      .then(albums => {
        for(let i = 0; i < albums.length; i++) {
          let artist = this.state.artists[i];
          albumsObj.artist.push(albums[i]);
        }
        this.setState({
          albums: albumsObj
        });
      });
    }
    else {
      this.readArtistDir()
      .then(() => {
        for(let artist of this.state.artists) {
          albumsObj.artist = [];
          albumPromises.push(this.readDir(artist));
        }
        Promise.all(albumPromises)
        .then(albums => {
          for(let i = 0; i < albums.length; i++) {
            let artist = this.state.artists[i];
            albumsObj.artist.push(albums[i]);
          }
          this.setState({
            albums: albumsObj
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
    }
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
