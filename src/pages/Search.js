import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    searchArtistInput: '',
    isSearchArtistButtonDisabled: true,
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
    }
  };

  render() {
    const { searchArtistInput, isSearchArtistButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
