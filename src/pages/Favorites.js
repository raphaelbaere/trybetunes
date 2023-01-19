import React, { Component } from 'react';
import CardMusic from '../components/CardMusic';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    loading: false,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.getFavoriteSongsFromAPI();
  }

  getFavoriteSongsFromAPI = async () => {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs });
    this.setState({ loading: false });
  };

  onFavoriteSongRemove = (trackId) => {
    const { favoriteSongs } = this.state;
    const favoriteSongs2 = favoriteSongs.filter((favoriteSong) => (
      favoriteSong.trackId !== trackId));
    this.setState({ favoriteSongs: favoriteSongs2 });
  };

  showFavoriteSongs = () => {
    const { favoriteSongs } = this.state;
    const allFavoriteSongs = favoriteSongs.map((favoriteSong) => (
      <CardMusic
        trackId={ favoriteSong.trackId }
        key={ favoriteSong.trackId }
        musicObject={ favoriteSong }
        onFavoriteSongRemove={ this.onFavoriteSongRemove }
      />));
    return allFavoriteSongs;
  };

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : (
          <div>
            {this.showFavoriteSongs()}
          </div>
        )}
      </div>
    );
  }
}
