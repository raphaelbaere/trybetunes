import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import ResponsiveAppBar from './HeaderPage';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    user: {},
    loading: false,
  };

  componentDidMount() {
    this.getUserVariable();
  }

  getUserVariable = async () => {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      user,
      loading: false,
    });
  };

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        <ResponsiveAppBar color="primary" user={ user } loading={ loading } />
      </header>
    );
  }
}
