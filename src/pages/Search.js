import React, { Component } from 'react';
import CardMusic from '../components/CardMusic';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    searchArtistInput: '',
    isSearchArtistButtonDisabled: true,
    searchedArtist: '',
    loading: false,
    albums: [],
    loadingApi: true,
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    const minLength = 2;
    this.setState({
      [name]: value,
    });
    if (name === 'searchArtistInput' && value.length >= minLength) {
      this.setState({
        isSearchArtistButtonDisabled: false,
      });
    } else {
      this.setState({
        isSearchArtistButtonDisabled: true,
      });
    }
  };

  onSearchArtistButtonClick = async () => {
    const { searchArtistInput } = this.state;
    this.setState({
      loading: true,
    });
    const albums = await searchAlbumsAPI(searchArtistInput);
    this.setState({
      searchedArtist: searchArtistInput,
      searchArtistInput: '',
      albums,
      loadingApi: false,
      loading: false,
    });
  };

  showAlbums = (albums) => {
    const allAlbums = albums.map((album) => (
      <CardMusic
        key={ album.collectionId }
        musicObject={ album }
      />));
    return allAlbums;
  };

  render() {
    const { searchArtistInput,
      isSearchArtistButtonDisabled,
      loading, searchedArtist,
      loadingApi, albums } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading && loadingApi === false ? <Loading /> : (
          <form onSubmit={ (event) => event.preventDefault() }>
            <label htmlFor="searchArtistInput">
              Search for artists
              <input
                data-testid="search-artist-input"
                type="text"
                name="searchArtistInput"
                value={ searchArtistInput }
                onChange={ this.onInputChange }
                id="searchArtistInput"
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isSearchArtistButtonDisabled }
              onClick={ this.onSearchArtistButtonClick }
            >
              Pesquisar
            </button>
          </form>
        )}
        {loadingApi ? '' : (
          <div>
            {albums.length > 1 ? (
              <div>
                <p>
                  Resultado de álbuns de:
                  {' '}
                  {searchedArtist}
                </p>
                {this.showAlbums(albums)}
              </div>) : <p>Nenhum álbum foi encontrado</p>}
          </div>
        )}
      </div>
    );
  }
}
