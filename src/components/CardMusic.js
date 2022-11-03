import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class CardMusic extends Component {
  render() {
    const { musicObject } = this.props;
    return (
      <div>
        <p>{musicObject.trackName}</p>
        {musicObject.previewUrl && (
          <audio data-testid="audio-component" src={ musicObject.previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
        )}
      </div>
    );
  }
}

CardMusic.propTypes = {
  musicObject: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
};
