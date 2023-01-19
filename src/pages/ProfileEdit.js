import React, { Component } from 'react';
import Header from '../components/Header';
import UserProfileEdit from '../components/UserProfileEdit';

export default class ProfileEdit extends Component {
  render() {
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <UserProfileEdit />
      </div>
    );
  }
}
