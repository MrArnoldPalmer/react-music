import React from 'react';
import * as Dropbox from './modules/Dropbox.jsx';
import Song from './Song.jsx';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      songs: [],
      cover: '',
      coverUrl: ''
    };
    this.getSongs = this.getSongs.bind(this);
  }
  getSongs() {
    return new Promise((resolve, reject) => {
      Dropbox.readDir(this.props.artist + '/' + this.props.album)
      .then(entries => {
        let songs = [];
        let cover;
        for(let file of entries) {
          if(file.substr(file.length - 4) == '.jpg') {
            cover = file;
          }
          else {
            songs.push(file);
          }
          this.setState({
            songs: songs,
            cover: this.props.artist + '/' + this.props.album + '/' + cover
          });
        }
        resolve();
      })
      .catch(error => {
        reject(error);
      });
    });
  }
  componentDidMount() {
    this.getSongs()
    .then(songs => {
      return Dropbox.getUrl(this.state.cover);
    })
    .then(data => {
      this.setState({
        coverUrl: data.url
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  render() {
    return (
      <div>
        {this.props.album}
        <ul>
          {this.state.songs.map(song => {
            return (
              <Song key={song} song={song} artist={this.props.artist} album={this.props.album} />
            );
          })}
        </ul>
        {this.state.coverUrl.length ? (
          <img src={this.state.coverUrl}/>
        ) : null}
      </div>
    );
  }
}
