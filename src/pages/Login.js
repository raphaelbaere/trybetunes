import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';

export default class Login extends Component {
  render() {
    const {
      onEnterLoginClick,
      loginNameInput,
      isLoginButtonDisabled,
      onInputChange,
      loading,
      onFormSubmit,
      redirect } = this.props;
    return (
      <div data-testid="page-login">
        { loading ? <Loading /> : (
          <form onSubmit={ onFormSubmit }>
            <label htmlFor="login-name-input">
              Nome
              <input
                id="login-name-input"
                data-testid="login-name-input"
                type="text"
                name="loginNameInput"
                value={ loginNameInput }
                onChange={ onInputChange }
              />
            </label>
            <button
              disabled={ isLoginButtonDisabled }
              onClick={ onEnterLoginClick }
              type="button"
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </form>)}
        { redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

Login.propTypes = {
  isLoginButtonDisabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loginNameInput: PropTypes.string.isRequired,
  onEnterLoginClick: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  redirect: PropTypes.bool.isRequired,
};
