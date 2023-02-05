/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import SignIn from '../components/LoginPage';
import ResponsiveAppBarLogin from '../components/ResponsiveAppBarLogin';

export default class Login extends Component {
  render() {
    const {
      onEnterLoginClick,
      loginNameInput,
      loginEmailInput,
      loginImageInput,
      loginDescInput,
      isLoginButtonDisabled,
      onInputChange,
      loading,
      onFormSubmit,
      redirect } = this.props;
    return (
      <div data-testid="page-login">
        <ResponsiveAppBarLogin />
        { loading ? <Loading /> : (
          <SignIn
            onInputChange={ onInputChange }
            isLoginButtonDisabled={ isLoginButtonDisabled }
            loginNameInput={ loginNameInput }
            onEnterLoginClick={ onEnterLoginClick }
          />)}
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
          <label htmlFor="login-email-input">
            Email
            <input
              id="login-email-input"
              type="text"
              name="loginEmailInput"
              value={ loginEmailInput }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="login-desc-input">
            Descrição
            <textarea
              id="login-desc-input"
              name="loginDescInput"
              value={ loginDescInput }
              onChange={ onInputChange }
            />
            <label htmlFor="login-image-input">
              Imagem
              <input
                id="login-image-input"
                data-testid="login-image-input"
                type="text"
                name="loginImageInput"
                value={ loginImageInput }
                onChange={ onInputChange }
              />
            </label>
          </label>
          <button
            disabled={ isLoginButtonDisabled }
            onClick={ onEnterLoginClick }
            type="button"
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>
        { redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

Login.propTypes = {
  isLoginButtonDisabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  loginDescInput: PropTypes.string.isRequired,
  loginEmailInput: PropTypes.string.isRequired,
  loginImageInput: PropTypes.string.isRequired,
  loginNameInput: PropTypes.string.isRequired,
  onEnterLoginClick: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  redirect: PropTypes.bool.isRequired,
};
