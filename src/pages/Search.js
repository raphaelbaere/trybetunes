import { Button, TextField } from '@mui/material';
import React, { Component } from 'react';
import CardAlbum from '../components/CardAlbum';
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
      <CardAlbum
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
          <form
            className="search-form"
            onSubmit={ (event) => event.preventDefault() }
          >
            <TextField
              id="searchArtistInput"
              label="Search for album or artist"
              variant="outlined"
              data-testid="search-artist-input"
              type="text"
              name="searchArtistInput"
              value={ searchArtistInput }
              onChange={ this.onInputChange }
            />
            <Button
              sx={ { marginLeft: 0.5 } }
              color="success"
              variant="contained"
              type="button"
              data-testid="search-artist-button"
              disabled={ isSearchArtistButtonDisabled }
              onClick={ this.onSearchArtistButtonClick }
            >
              Pesquisar
            </Button>
          </form>
        )}
        {loadingApi ? '' : (
          <div>
            {albums.length > 1 ? (
              <div>
                <p className="search-results">
                  Resultado de álbuns de:
                  {' '}
                  <span className="searched-artist">
                    {searchedArtist}
                  </span>
                </p>
                <div className="albums">
                  {this.showAlbums(albums)}
                </div>
              </div>) : <p>Nenhum álbum foi encontrado</p>}
          </div>
        )}
      </div>
    );
  }
}
