import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import UserProfile from '../components/UserProfile';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    loading: false,
    userProfile: {},
  };

  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile = async () => {
    this.setState({ loading: true });
    const userProfile = await getUser();
    this.setState({ userProfile, loading: false });
  };

  render() {
    const { loading, userProfile } = this.state;
    const { name, email, image, description } = userProfile;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <UserProfile
            userName={ name }
            userEmail={ email }
            userImage={ image }
            userDescription={ description }
          />
        )}
      </div>
    );
  }
}
