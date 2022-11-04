import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class CardMusic extends Component {
  state = {
    loading: false,
  };

  addSongsToFavorites = async (event) => {
    const trackId = event.target.parentNode.parentNode.children[1].innerHTML;
    this.setState({ loading: true });
    await addSong(trackId);
    this.setState({ loading: false });
  };

  render() {
    const { musicObject } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <p>{musicObject.trackName}</p>
        <p>{musicObject.trackId}</p>
        {musicObject.previewUrl && (
          <div>
            <audio data-testid="audio-component" src={ musicObject.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor="favorite-music">
              Favorita
              <input
                id="favorite-music"
                type="checkbox"
                data-testid={ `checkbox-music-${musicObject.trackId}` }
                onChange={ this.addSongsToFavorites }
              />
            </label>
          </div>
        )}
        {loading && <Loading />}
      </div>
    );
  }
}

CardMusic.propTypes = {
  musicObject: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
    trackName: PropTypes.string,
  }).isRequired,
};
