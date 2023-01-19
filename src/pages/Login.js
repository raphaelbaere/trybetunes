import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import SignIn from '../components/LoginPage';
import ResponsiveAppBarLogin from '../components/ResponsiveAppBarLogin';

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
        <ResponsiveAppBarLogin />
        { loading ? <Loading /> : (
          <SignIn
            onInputChange={ onInputChange }
            isLoginButtonDisabled={ isLoginButtonDisabled }
            loginNameInput={ loginNameInput }
            onEnterLoginClick={ onEnterLoginClick }
          />)}
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
