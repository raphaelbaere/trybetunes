import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { createUser } from './services/userAPI';

class App extends React.Component {
  state = {
    loginNameInput: '',
    loginEmailInput: '',
    loginDescInput: '',
    loginImageInput: '',
    isLoginButtonDisabled: true,
    loading: false,
    redirect: false,
  };

  onFormSubmit = (event) => {
    event.preventDefault();
  };

  onInputChange = ({ target }) => {
    const minInputLength = 3;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    if (name === 'loginNameInput' && value.length >= minInputLength) {
      this.setState({
        isLoginButtonDisabled: false,
      });
    } else {
      this.setState({
        isLoginButtonDisabled: true,
      });
    }
  };

  onEnterLoginClick = async () => {
    const { loginNameInput, loginEmailInput, loginImageInput,
      loginDescInput } = this.state;
    this.setState({ loading: true });
    await createUser({
      name: loginNameInput,
      email: loginEmailInput,
      image: loginImageInput,
      description: loginDescInput,
    });
    this.setState({
      loading: false,
      redirect: true,
    });
  };

  render() {
    const { loginNameInput,
      loginEmailInput,
      loginDescInput,
      loginImageInput, isLoginButtonDisabled, loading, redirect } = this.state;
    return (
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Login
              loginNameInput={ loginNameInput }
              loginEmailInput={ loginEmailInput }
              loginDescInput={ loginDescInput }
              loginImageInput={ loginImageInput }
              isLoginButtonDisabled={ isLoginButtonDisabled }
              onEnterLoginClick={ this.onEnterLoginClick }
              onInputChange={ this.onInputChange }
              loading={ loading }
              onFormSubmit={ this.onFormSubmit }
              redirect={ redirect }
            />
          </Route>
          <Route path="/search"><Search /></Route>
          <Route
            path="/album/:id"
            render={ (props) => (<Album
              { ...props }
            />) }
          />
          <Route path="/favorites"><Favorites /></Route>
          <Route exact path="/profile"><Profile /></Route>
          <Route path="/profile/edit"><ProfileEdit /></Route>
          <Route path="*"><NotFound /></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
