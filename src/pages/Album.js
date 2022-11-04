import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CardMusic from '../components/CardMusic';
import Header from '../components/Header';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  state = {
    musics: [],
    loading: true,
  };

  componentDidMount() {
    this.musicRequisition();
  }

  musicRequisition = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const musics = await getMusics(id);
    this.setState({ musics, loading: false });
  };

  showMusics = (musics) => {
    const allMusics = musics.map((music, index) => (
      <CardMusic
        key={ index }
        musicObject={ music }
      />));
    return allMusics;
  };

  render() {
    const { musics, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : (
          <div>
            {musics.length === 0 ? <Loading /> : (
              <div>
                <p data-testid="artist-name">
                  Artista:
                  {musics[0].artistName}
                </p>
                <p data-testid="album-name">
                  Album:
                  {musics[0].collectionName}
                </p>
                {this.showMusics(musics)}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
